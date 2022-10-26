import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import useMarvelService from '../../hooks/useMarvelService'

import Spinner from '../loadingStatus/Spinner/Spinner'
import Error from '../loadingStatus/Error/Error'
import Skeleton from '../Skeleton/Skeleton'

import './charInfo.scss'

const CharInfo = (props) => {
  const [char, setChar] = useState(null)

  const { isLoading, isError, getCharacter } = useMarvelService()

  useEffect(() => {
    updateChar()
  }, [props.charId])

  const updateChar = () => {
    if (props.charId) {
      getCharacter(props.charId).then(setChar)
    }
  }

  const skeleton = char || isLoading || isError ? null : <Skeleton />
  const spinner = isLoading ? <Spinner /> : null
  const loadError = isError ? <Error /> : null
  const content = isLoading || isError || skeleton ? null : <View char={char} />

  return (
    <div className="char__info">
      {skeleton}
      {spinner}
      {loadError}
      {content}
    </div>
  )
}

const View = ({ char }) => {
  const { name, description, thumbnail, comics, homepage, wiki, imgStyle } =
    char

  const createComics = () => {
    if (comics.length > 10) {
      return [...comics].splice(0, 10).map((item) => {
        const comicId = item.resourceURI.replace(/\D/g, '').slice(1)

        return (
          <Link
            to={`comics/${comicId}`}
            className="char__comics-item"
            key={item.name}
          >
            {item.name}
          </Link>
        )
      })
    }

    return comics.map((item) => {
      const comicId = item.resourceURI.replace(/\D/g, '').slice(1)

      return (
        <Link
          to={`comics/${comicId}`}
          className="char__comics-item"
          key={item.name}
        >
          {item.name}
        </Link>
      )
    })
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a
              href={homepage}
              target="_blank"
              tabIndex={0}
              className="button button__main"
            >
              <div className="inner">homepage</div>
            </a>
            <a
              href={wiki}
              target="_blank"
              tabIndex={0}
              className="button button__secondary"
            >
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length
          ? createComics()
          : 'There is no comics for this character'}
      </ul>
    </>
  )
}

CharInfo.propTypes = {
  charId: PropTypes.number,
}

CharInfo.defaultProps = {
  charId: 1011500,
}

export default CharInfo
