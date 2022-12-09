import { Link } from 'react-router-dom'

import useMarvelService from '../../hooks/useMarvelService'
import useSinglePage from '../../hooks/useSinglePage'
import { setContent } from '../../utils/setContent'

import { Helmet } from 'react-helmet'

import './singleComic.scss'

const SingleComicPage = () => {
  const { process, setProcess, getComic } = useMarvelService()
  const { data, navigate } = useSinglePage(getComic, setProcess)

  return <>{setContent(process, View, { data, navigate })}</>
}

const View = ({
  data: { title, description, thumbnail, pageCount, language, price },
  navigate,
}) => {
  return (
    <>
      <Helmet>
        <meta name="description" content={`${title} comics book`} />
        <title>{title}</title>
      </Helmet>

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
    </>
  )
}

export default SingleComicPage
