import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import PropTypes from 'prop-types'

import useMarvelService from '../../hooks/useMarvelService'
import { setContent } from '../../utils/setContent'

import './charInfo.scss'

const CharInfo = ({ charId }) => {
  const [char, setChar] = useState(null)

  const { process, setProcess, getCharacter } = useMarvelService()

  useEffect(() => {
    updateChar()
  }, [charId])

  const updateChar = () => {
    if (charId) {
      getCharacter(charId)
        .then(setChar)
        .then(() => setProcess('success'))
    }
  }

  return <div className="char__info">{setContent(process, View, { char })}</div>
}

const View = ({
  char: { id, name, description, thumbnail, comics, wiki, imgStyle },
}) => {
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
            <Link
              to={`/character/${id}`}
              tabIndex={0}
              className="button button__main"
            >
              <div className="inner">homepage</div>
            </Link>
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
