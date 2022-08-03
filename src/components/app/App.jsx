import { Component } from 'react'

import AppHeader from '../AppHeader/AppHeader'
import RandomChar from '../RandomChar/RandomChar'
import CharList from '../CharList/CharList'
import CharInfo from '../CharInfo/CharInfo'

import decoration from '../../resources/img/vision.png'

class App extends Component {
  state = {
    selectedChar: null,
  }

  onCharSelected = (charId) => {
    this.setState({
      selectedChar: charId,
    })
  }

  render() {
    const { selectedChar } = this.state

    return (
      <div className="app">
        <AppHeader />
        <main>
          <RandomChar />
          <div className="char__content">
            <CharList onCharSelected={this.onCharSelected} />
            <CharInfo charId={selectedChar} />
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    )
  }
}

export default App
