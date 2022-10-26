import { Link } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import useMarvelService from '../../hooks/useMarvelService'
import useListLoad from '../../hooks/useListLoad'
import useListEvent from '../../hooks/useListEvent'

import Spinner from '../loadingStatus/Spinner/Spinner'
import Error from '../loadingStatus/Error/Error'

import './comicsList.scss'

const ComicsList = () => {
  const { isLoading, isError, getAllComics } = useMarvelService()
  const { list, isNewListLoading, isItemsEnded, onUpdateList } = useListLoad(
    getAllComics,
    8,
    250
  )
  const { itemsParentRef, onItemFocus, onKeyDownOnItem } = useListEvent()

  const createComics = (itemsList) => {
    return itemsList.map(({ id, title, thumbnail, price }, index) => (
      <CSSTransition key={index} timeout={700} classNames="comics__item">
        <div
          className="comics__item"
          role="presentation"
          tabIndex={0}
          onFocus={onItemFocus}
          onKeyDown={onKeyDownOnItem}
        >
          <Link to={`/comics/${id}`} tabIndex={-1}>
            <img src={thumbnail} alt="comic" className="comics__item-img" />
            <div className="comics__item-name">{title}</div>
            <div className="comics__item-price">{price}$</div>
          </Link>
        </div>
      </CSSTransition>
    ))
  }

  const spinner = isLoading && !isNewListLoading ? <Spinner /> : null
  const loadError = isError ? <Error /> : null

  return (
    <div className="comics__list">
      {spinner}
      {loadError}
      {/* <ul ref={itemsParentRef} className="comics__grid">
        {createComics(list)}
      </ul> */}
      <div ref={itemsParentRef}>
        <TransitionGroup className="comics__grid">
          {createComics(list)}
        </TransitionGroup>
      </div>
      <button
        type="button"
        className="button button__main button__long"
        style={{ display: isItemsEnded ? 'none' : 'block' }}
        disabled={isNewListLoading}
        onClick={() => onUpdateList()}
        // onClick={onUpdateList} если оставить так, то в обработчик 1ым аргументом будет приходить объект события и будут баги
      >
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default ComicsList
