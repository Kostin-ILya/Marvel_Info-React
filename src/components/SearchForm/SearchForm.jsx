import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Link } from 'react-router-dom'

import useMarvelService from '../../hooks/useMarvelService'
import Error from '../loadingStatus/Error/Error'

import './searchForm.scss'

const CharForm = () => {
  const [char, setChar] = useState(null)

  const { isError, getCharacterByName } = useMarvelService()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: 'all' })

  const onSubmit = async (data) => {
    await getCharacterByName(data.name).then(setChar)
  }

  return (
    <form className="char__form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Or find a character by name:</label>

      <div className="char__form_wrapper">
        <input
          id="name"
          placeholder="Enter name"
          {...register('name', {
            required: 'This field is required',
            minLength: { value: 2, message: 'At least two characters' },
            onChange: (e) => (!e.target.value ? setChar(null) : null),
          })}
        />

        <button
          className="button button__main"
          type="submit"
          disabled={!isValid || isSubmitting}
        >
          <div className="inner">FIND</div>
        </button>
      </div>

      {errors?.name && (
        <div className="char__msg_error">{errors.name.message}</div>
      )}

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
    </form>
  )
}

export default CharForm
