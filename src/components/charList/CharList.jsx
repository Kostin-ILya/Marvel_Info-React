import { Component } from 'react'

import CharListItem from './Item/CharListItem'
import MarvelService from '../../services/MarvelService'
import Spinner from '../loadingStatus/Spinner/Spinner'
import LoadError from '../loadingStatus/LoadError/LoadError'

import './charList.scss'

class CharList extends Component {
  state = { charList: [], loading: true, error: false }

  componentDidMount() {
    this.updateCharList()
  }

  updateCharList = () => {
    const marvelService = new MarvelService()
    marvelService
      .getAllCharacters()
      .then((res) => {
        this.onCharListLoaded(res)
      })
      .catch((err) => {
        this.onLoadError(err)
      })
  }

  onCharListLoaded = (charList) => {
    this.setState({ charList, loading: false })
  }

  onLoadError = (err) => {
    this.setState({ error: true, loading: false })
    console.error(err)
  }

  createCharListItems = (charListArr) => {
    const chars = charListArr.map(({ id, name, thumbnail }) => {
      const imgStyle = thumbnail.includes('image_not_available')
        ? { objectFit: 'initial' }
        : null

      return (
        <CharListItem
          key={id}
          name={name}
          thumbnail={thumbnail}
          imgStyle={imgStyle}
          onCharSelected={() => {
            this.props.onCharSelected(id)
          }}
        />
      )
    })
    return <ul className="char__grid">{chars}</ul>
  }

  render() {
    const { loading, error } = this.state

    const elements = this.createCharListItems(this.state.charList)
    const spinner = loading ? <Spinner /> : null
    const loadError = error ? <LoadError /> : null
    const content = loading || error ? null : elements

    return (
      <div className="char__list">
        {spinner}
        {loadError}
        {content}
        <button type="button" className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
}

export default CharList
