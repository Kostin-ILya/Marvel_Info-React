import React, { Component } from 'react'
import PropTypes from 'prop-types'

import MarvelService from '../../services/MarvelService'
import Spinner from '../loadingStatus/Spinner/Spinner'
import LoadError from '../loadingStatus/LoadError/LoadError'

import './charList.scss'

class CharList extends Component {
  state = { charList: [], loading: true, error: false }

  charItemsRefs = React.createRef()

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

  onCharFocus = (e) => {
    const charItems = [...this.charItemsRefs.current.children]
    charItems.forEach((item) => {
      item.classList.remove('char__item_selected')
    })
    e.target.classList.add('char__item_selected')
  }

  keyDownCharItem = (e) => {
    if (e.code === 'Space' || e.code === 'Enter' || e.code === 'NumpadEnter') {
      e.preventDefault()
      e.target.click()
    }
  }

  createCharListItems = (charListArr) => {
    const chars = charListArr.map(({ id, name, thumbnail }) => {
      const imgStyle = thumbnail.includes('image_not_available')
        ? { objectFit: 'initial' }
        : null

      return (
        <li
          key={id}
          className="char__item"
          role="presentation"
          tabIndex={0}
          onFocus={this.onCharFocus}
          onKeyDown={this.keyDownCharItem}
          onClick={() => {
            this.props.onCharSelected(id)
          }}
        >
          <img src={thumbnail} alt={name} style={imgStyle} />
          <div className="char__name">{name}</div>
        </li>
      )
    })
    return (
      <ul ref={this.charItemsRefs} className="char__grid">
        {chars}
      </ul>
    )
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

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
}

export default CharList
