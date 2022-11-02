import { useState } from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { Link } from 'react-router-dom'

import useMarvelService from '../../hooks/useMarvelService'

import './searchForm.scss'

const CharForm = () => {
  const [char, setChar] = useState(null)
  const [isCharNoFound, setIsCharNoFound] = useState(null)

  const { getCharacterByName } = useMarvelService()

  const onSubmit = async (values, { resetForm }) => {
    setIsCharNoFound(false)
    const res = await getCharacterByName(values.name)

    if (res) {
      setChar(res)
      setMessage(res.name)
    } else {
      setIsCharNoFound(true)
      resetForm()
    }

    // res ? setChar(res) : setIsCharNoFound(true)
  }

  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={yup.object({
        name: yup
          .string()
          .required('This field is required')
          .min(2, 'At least two characters'),
      })}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="char__form">
          <p>Or find a character by name:</p>

          <div className="char__form_wrapper">
            <Field type="text" name="name" placeholder="Enter name" />
            <button
              className="button button__main"
              type="submit"
              disabled={isSubmitting}
            >
              <div className="inner">FIND</div>
            </button>
          </div>
          <div className="char__form_wrapper">
            <ErrorMessage
              name="name"
              className="char__msg_error"
              component="div"
            />
            {char && (
              <>
                <div className="char__msg_success">{`There is! Visit ${char.name} page?`}</div>
                <Link
                  to={`/character/${char.id}`}
                  className="button button__secondary"
                >
                  <div className="inner">TO PAGE</div>
                </Link>
              </>
            )}
            {isCharNoFound && (
              <div className="char__msg_error">
                The character was not found. Check the name and try again
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default CharForm
