import { Helmet } from 'react-helmet'

import useMarvelService from '../../hooks/useMarvelService'
import useSinglePage from '../../hooks/useSinglePage'
import setContent from '../../utils/setContent'

// import ComicsList from '../../components/ComicsList/ComicsList'
import AppBanner from '../../components/AppBanner/AppBanner'

import './singleCharPage.scss'

const SingleCharPage = () => {
  const { process, setProcess, getCharacter } = useMarvelService()
  const { data, navigate } = useSinglePage(getCharacter, setProcess)

  return <>{setContent(process, View, { data, navigate })}</>
}

const View = ({ data: { name, description, thumbnail }, navigate }) => {
  return (
    <>
      <Helmet>
        <meta name="description" content={`Marvel character: ${name}`} />
        <title>{name}</title>
      </Helmet>

      <AppBanner />

      <div className="single-char">
        <img src={thumbnail} alt={name} className="single-char__img" />
        <div className="single-char__info">
          <h2 className="single-char__name">{name}</h2>
          <p className="single-char__descr">
            {description || 'No description'}
          </p>
        </div>
        <a className="single-char__link_back" onClick={() => navigate(-1)}>
          Back to previous page
        </a>
      </div>

      {/* <div className="single-char__comics">
        <ComicsList />
      </div> */}
    </>
  )
}

export default SingleCharPage
