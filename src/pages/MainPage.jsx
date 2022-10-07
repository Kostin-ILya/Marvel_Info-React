import { useState } from 'react'

import RandomChar from '../components/RandomChar/RandomChar'
import CharList from '../components/CharList/CharList'
import CharInfo from '../components/CharInfo/CharInfo'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'

import decoration from '../resources/img/vision.png'

const MainPage = () => {
  const [selectedChar, setSelectedChar] = useState(null)

  const onCharSelected = (charId) => {
    setSelectedChar(charId)
  }
  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char__content">
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <ErrorBoundary>
          <CharInfo charId={selectedChar} />
        </ErrorBoundary>
      </div>
      <img className="bg-decoration" src={decoration} alt="vision" />
    </>
  )
}

export default MainPage
