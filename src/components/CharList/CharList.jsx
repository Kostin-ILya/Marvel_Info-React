import { TransitionGroup, CSSTransition } from 'react-transition-group'

import useMarvelService from '../../hooks/useMarvelService'
import useListLoad from '../../hooks/useListLoad'
import useListEvent from '../../hooks/useListEvent'

import Spinner from '../loadingStatus/Spinner/Spinner'
import Error from '../loadingStatus/Error/Error'

import PropTypes from 'prop-types'

import './charList.scss'

const CharList = (props) => {
  const { isLoading, isError, getAllCharacters } = useMarvelService()

  const { list, isNewListLoading, isItemsEnded, onUpdateList } = useListLoad(
    getAllCharacters,
    9,
    300
  )

  const { itemsParentRef, onItemFocus, onKeyDownOnItem } = useListEvent()

  const createChars = (charListArr) =>
    charListArr.map(({ id, name, thumbnail, imgStyle }, index) => (
      <CSSTransition key={index} timeout={700} classNames="char__item">
        <li
          className="char__item"
          role="presentation"
          tabIndex={0}
          onFocus={onItemFocus}
          onKeyDown={onKeyDownOnItem}
          onClick={() => {
            props.onCharSelected(id)
          }}
        >
          <img src={thumbnail} alt={name} style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      </CSSTransition>
    ))

  return (
    <div className="char__list">
      {isLoading && !isNewListLoading && <Spinner />}

      {isError && <Error />}

      <ul ref={itemsParentRef} className="char__grid">
        <TransitionGroup component={null}>{createChars(list)}</TransitionGroup>
      </ul>

      <button
        type="button"
        className="button button__main button__long"
        style={{ display: isItemsEnded ? 'none' : 'block' }}
        disabled={isNewListLoading}
        onClick={onUpdateList}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  )
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
}

export default CharList
