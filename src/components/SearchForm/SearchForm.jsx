import { Formik, Field } from 'formik'

import './searchForm.scss'

const CharForm = () => {
  return (
    <form className="char__form">
      <p>Or find a character by name:</p>

      <div className="char__form_wrapper">
        <input type="text" placeholder="Enter name" />
        <button className="button button__main" type="submit">
          <div className="inner">FIND</div>
        </button>
      </div>
    </form>
  )
}

export default CharForm
