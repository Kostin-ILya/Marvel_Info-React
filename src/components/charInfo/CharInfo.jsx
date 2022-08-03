import { Component } from 'react'
import MarvelService from '../../services/MarvelService'

import Spinner from '../loadingStatus/Spinner/Spinner'
import LoadError from '../loadingStatus/LoadError/LoadError'
import Skeleton from '../Skeleton/Skeleton'

import './charInfo.scss'

class CharInfo extends Component {
  state = {
    char: null,
    skeleton: true,
    loading: false,
    error: false,
  }

  marvelService = new MarvelService()

  componentDidMount() {
    this.updateChar()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.charId !== this.props.charId) {
      this.updateChar()
    }
  }

  updateChar = () => {
    if (this.props.charId) {
      this.charLoading()
      this.marvelService
        .getCharacter(this.props.charId)
        .then(this.onCharLoaded)
        .catch(this.onLoadError)
    }
  }

  charLoading = () => {
    this.setState({ loading: true })
  }

  onCharLoaded = (char) => {
    this.setState({ char, skeleton: false, loading: false })
  }

  onLoadError = (err) => {
    this.setState({ error: true, skeleton: false, loading: false })
    console.error(err)
  }

  render() {
    const { char, skeleton, loading, error } = this.state
    const skeletonBlock = skeleton ? <Skeleton /> : null
    const spinner = loading ? <Spinner /> : null
    const loadError = error ? <LoadError /> : null
    const content = loading || error || skeleton ? null : <View char={char} />

    return (
      <div className="char__info">
        {skeletonBlock}
        {spinner}
        {loadError}
        {content}
      </div>
    )
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, comics, homepage, wiki } = char

  const imgStyle = thumbnail.includes('image_not_available')
    ? { objectFit: 'initial' }
    : null

  let comicsBlock = null
  if (comics.length !== 0) {
    if (comics.length > 10) {
      comicsBlock = [...comics].splice(0, 10).map((item, i) => {
        return (
          <li className="char__comics-item" key={i}>
            {item.name}
          </li>
        )
      })
    } else {
      comicsBlock = comics.map((item, i) => {
        return (
          <li className="char__comics-item" key={i}>
            {item.name}
          </li>
        )
      })
    }
  }

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comicsBlock ? (
          comicsBlock
        ) : (
          <span>There is no comics for this character</span>
        )}
      </ul>
    </>
  )
}

export default CharInfo
