import { Helmet } from 'react-helmet'

import useMarvelService from '../../hooks/useMarvelService'
import useSinglePage from '../../hooks/useSinglePage'

// import ComicsList from '../../components/ComicsList/ComicsList'
import AppBanner from '../../components/AppBanner/AppBanner'
import Spinner from '../../components/loadingStatus/Spinner/Spinner'
import Error from '../../components/loadingStatus/Error/Error'

import './singleCharPage.scss'

const SingleCharPage = () => {
  const { isLoading, isError, getCharacter } = useMarvelService()
  const { data, navigate } = useSinglePage(getCharacter)

  const spinner = isLoading ? <Spinner /> : null
  const loadError = isError ? <Error /> : null
  const content = !(isLoading || isError || !data) ? (
    <View char={data} navigate={navigate} />
  ) : null

  return (
    <>
      {loadError}
      {spinner}
      {content}
    </>
  )
}

const View = ({ char: { name, description, thumbnail }, navigate }) => {
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
