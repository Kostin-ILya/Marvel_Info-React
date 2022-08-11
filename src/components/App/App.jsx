import { Component } from 'react'

import AppHeader from '../AppHeader/AppHeader'
import RandomChar from '../RandomChar/RandomChar'
import CharList from '../CharList/CharList'
import CharInfo from '../CharInfo/CharInfo'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

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
          <ErrorBoundary>
            <RandomChar />
          </ErrorBoundary>
          <div className="char__content">
            <ErrorBoundary>
              <CharList onCharSelected={this.onCharSelected} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo charId={selectedChar} />
            </ErrorBoundary>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    )
  }
}

export default App