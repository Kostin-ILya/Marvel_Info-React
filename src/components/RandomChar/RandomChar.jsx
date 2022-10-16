import { useState, useEffect } from 'react'
import useMarvelService from '../../hooks/useMarvelService'

import Spinner from '../loadingStatus/Spinner/Spinner'
import Error from '../loadingStatus/Error/Error'

import mjolnir from '../../resources/img/mjolnir.png'
import './randomChar.scss'

const RandomChar = () => {
  const [char, setChar] = useState(null)

  const { isLoading, isError, getCharacter } = useMarvelService()

  useEffect(() => {
    updateChar()
  }, [])

  const updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)

    getCharacter(id).then(setChar)
  }

  const spinner = isLoading ? <Spinner /> : null
  const loadError = isError ? <Error /> : null
  const content = isLoading || isError || !char ? null : <View char={char} />

  return (
    <div className="randomchar">
      {spinner}
      {loadError}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button
          type="button"
          className="button button__main"
          onClick={updateChar}
        >
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  )
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char

  const imgStyle = thumbnail.includes('image_not_available')
    ? { objectFit: 'initial' }
    : null

  return (
    <div className="randomchar__block">
      <img
        src={thumbnail}
        alt="Random character"
        className="randomchar__img"
        style={imgStyle}
      />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">
          {description || 'There is no description for this character'}
        </p>
        <div className="randomchar__btns">
          <a href={homepage} target="_blank" className="button button__main">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} target="_blank" className="button button__secondary">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  )
}

export default RandomChar
