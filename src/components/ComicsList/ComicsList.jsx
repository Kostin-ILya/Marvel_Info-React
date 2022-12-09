import { Link } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

import Spinner from '../loadingStatus/Spinner/Spinner'
import Error from '../loadingStatus/Error/Error'

import './comicsList.scss'

const ComicsList = ({
  isLoading,
  isError,
  list,
  isNewListLoading,
  isItemsEnded,
  onUpdateList,
  itemsParentRef,
  onItemFocus,
  onKeyDownOnItem,
}) => {
  const createComics = (itemsList) => {
    return itemsList.map(({ id, title, thumbnail, price }, index) => (
      <CSSTransition key={index} timeout={700} classNames="comics__item">
        <li
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
        </li>
      </CSSTransition>
    ))
  }

  return (
    <div className="comics__list">
      {isLoading && !isNewListLoading && <Spinner />}

      {isError && <Error />}

      <ul ref={itemsParentRef} className="comics__grid">
        <TransitionGroup component={null}>{createComics(list)}</TransitionGroup>
      </ul>

      <button
        type="button"
        className="button button__main button__long"
        style={{ display: isItemsEnded && 'none' }}
        disabled={isNewListLoading}
        onClick={onUpdateList}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

export default ComicsList
