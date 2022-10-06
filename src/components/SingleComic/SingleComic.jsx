import { useState, useEffect } from 'react'

import useMarvelService from '../../hooks/useMarvelService'

import Spinner from '../loadingStatus/Spinner/Spinner'
import Error from '../loadingStatus/Error/Error'

import './singleComic.scss'

const SingleComic = ({ comicId }) => {
  const [comic, setComic] = useState(null)
  const { isLoading, isError, getComic } = useMarvelService()

  useEffect(() => {
    updateComic()
  }, [comicId])

  const updateComic = () => {
    if (comicId) {
      getComic(comicId).then(setComic)
    }
  }

  const spinner = isLoading ? <Spinner /> : null
  const loadError = isError ? <Error /> : null
  const content = !(isLoading || isError || !comic) ? (
    <View comic={comic} />
  ) : null

  return (
    <>
      {loadError}
      {spinner}
      {content}
    </>
  )
}

const View = ({
  comic: { title, description, thumbnail, pageCount, language, price },
}) => {
  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount} pages</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}$</div>
      </div>
      <a href="#" className="single-comic__back">
        Back to all
      </a>
    </div>
  )
}

export default SingleComic
