import { Helmet } from 'react-helmet'

import useMarvelService from '../../hooks/useMarvelService'
import useSinglePage from '../../hooks/useSinglePage'
import useListLoad from '../../hooks/useListLoad'
import useListEvent from '../../hooks/useListEvent'
import { setContentWithList } from '../../utils/setContent'

import ComicsList from '../../components/ComicsList/ComicsList'
import AppBanner from '../../components/AppBanner/AppBanner'

import './singleCharPage.scss'

const SingleCharPage = () => {
  const {
    isLoading,
    isError,
    process,
    setProcess,
    getCharacter,
    getAllComicsByName,
  } = useMarvelService()
  const { data, id, navigate } = useSinglePage(getCharacter, setProcess)

  const { list, isNewListLoading, isItemsEnded, onUpdateList } = useListLoad(
    getAllComicsByName,
    8,
    0,
    id
  )
  const { itemsParentRef, onItemFocus, onKeyDownOnItem } = useListEvent()

  const comics = {
    list,
    itemsParentRef,
    onItemFocus,
    onKeyDownOnItem,
    onUpdateList,
    isNewListLoading,
    isLoading,
    isError,
    isItemsEnded,
  }

  return (
    <>
      {setContentWithList(process, View, { data, navigate, comics, process })}
    </>
  )
}

const View = ({ data: { name, description, thumbnail }, navigate, comics }) => {
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

      <div className="single-char__comics">
        {comics.list.length > 0 && (
          <h2>
            {'Comics with '} <span>{name}</span>
          </h2>
        )}
        <ComicsList {...comics} />
      </div>
    </>
  )
}

export default SingleCharPage
