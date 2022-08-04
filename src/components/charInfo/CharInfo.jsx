import { Component } from 'react'
import MarvelService from '../../services/MarvelService'

import Spinner from '../loadingStatus/Spinner/Spinner'
import LoadError from '../loadingStatus/LoadError/LoadError'
import Skeleton from '../Skeleton/Skeleton'

import './charInfo.scss'

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  }

  marvelService = new MarvelService()

  componentDidMount() {
    this.updateChar()
    // Если мы передадим начального charId через пропсов , то он отрисуется
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
    this.setState({ loading: true, error: false })
  }

  onCharLoaded = (char) => {
    this.setState({ char, loading: false })
  }

  onLoadError = (err) => {
    this.setState({ error: true, loading: false })
    console.error(err)
  }

  render() {
    const { char, loading, error } = this.state

    const skeleton = char || loading || error ? null : <Skeleton />
    const spinner = loading ? <Spinner /> : null
    const loadError = error ? <LoadError /> : null
    const content = loading || error || skeleton ? null : <View char={char} />

    return (
      <div className="char__info">
        {skeleton}
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

  function createComics() {
    if (comics.length > 10) {
      return [...comics].splice(0, 10).map((item) => (
        <li className="char__comics-item" key={item.name}>
          {item.name}
        </li>
      ))
    }
    return comics.map((item) => (
      <li className="char__comics-item" key={item.name}>
        {item.name}
      </li>
    ))
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
        {comics.length !== 0
          ? createComics()
          : 'There is no comics for this character'}
      </ul>
    </>
  )
}

export default CharInfo
