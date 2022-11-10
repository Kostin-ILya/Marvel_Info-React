import { useState } from 'react'

import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { Link } from 'react-router-dom'

import useMarvelService from '../../hooks/useMarvelService'
import Error from '../loadingStatus/Error/Error'

import './searchForm.scss'

const CharForm = () => {
  const [char, setChar] = useState(null)

  const { isLoading, isError, getCharacterByName } = useMarvelService()

  return (
    <Formik
      initialValues={{ name: '' }}
      validationSchema={yup.object({
        name: yup
          .string()
          .min(2, 'At least two characters')
          .required('This field is required'),
      })}
      onSubmit={(values) => getCharacterByName(values.name).then(setChar)}
    >
      <Form
        className="char__form"
        onChange={(e) => (e.target.value ? null : setChar(null))}
      >
        <label htmlFor="name">Or find a character by name:</label>

        <div className="char__form_wrapper">
          <Field type="text" name="name" id="name" placeholder="Enter name" />

          <button
            className="button button__main"
            type="submit"
            disabled={isLoading}
          >
            <div className="inner">FIND</div>
          </button>
        </div>

        <ErrorMessage name="name" className="char__msg_error" component="div" />

        <div className="char__form_wrapper">
          {char ? (
            char.length ? (
              <>
                <div className="char__msg_success">
                  {'There is! Visit '}
                  <span className="char__form_name">{char[0].name}</span>
                  {' page?'}
                </div>
                <Link
                  to={`/character/${char[0].id}`}
                  className="button button__secondary"
                >
                  <div className="inner">TO PAGE</div>
                </Link>
              </>
            ) : (
              <div className="char__msg_error">
                The character was not found. Check the name and try again
              </div>
            )
          ) : null}
        </div>

        {isError && <Error />}
      </Form>
    </Formik>
  )
}

export default CharForm
