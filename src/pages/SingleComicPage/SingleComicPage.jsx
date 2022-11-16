import { Link } from 'react-router-dom'

import useMarvelService from '../../hooks/useMarvelService'
import useSinglePage from '../../hooks/useSinglePage'

import Spinner from '../../components/loadingStatus/Spinner/Spinner'
import Error from '../../components/loadingStatus/Error/Error'

import './singleComic.scss'

const SingleComicPage = () => {
  const { isLoading, isError, getComic } = useMarvelService()
  const { data, navigate } = useSinglePage(getComic)

  const spinner = isLoading ? <Spinner /> : null
  const loadError = isError ? <Error /> : null
  const content = !(isLoading || isError || !data) ? (
    <View comic={data} navigate={navigate} />
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
  navigate,
}) => {
  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr-info">{pageCount}</p>
        <p className="single-comic__descr-info">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <div className="link-wrapper">
        <Link to="/comics" className="single-comic__back">
          Back to all comics
        </Link>
        <a onClick={() => navigate(-1)}> Back to previous page</a>
      </div>
    </div>
  )
}

export default SingleComicPage
