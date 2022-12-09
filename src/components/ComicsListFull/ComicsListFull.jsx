import ComicsList from '../ComicsList/ComicsList'
import useMarvelService from '../../hooks/useMarvelService'
import useListLoad from '../../hooks/useListLoad'
import useListEvent from '../../hooks/useListEvent'

const ComicsListFull = () => {
  const { isLoading, isError, getAllComics } = useMarvelService()
  const { list, isNewListLoading, isItemsEnded, onUpdateList } = useListLoad(
    getAllComics,
    8,
    250
  )
  const { itemsParentRef, onItemFocus, onKeyDownOnItem } = useListEvent()

  const data = {
    isLoading,
    isError,
    list,
    isNewListLoading,
    isItemsEnded,
    onUpdateList,
    itemsParentRef,
    onItemFocus,
    onKeyDownOnItem,
  }

  return <ComicsList {...data} />
}

export default ComicsListFull
