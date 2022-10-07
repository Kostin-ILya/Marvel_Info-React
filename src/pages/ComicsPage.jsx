import ComicsList from '../components/ComicsList/ComicsList'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'

const ComicsPage = () => {
  return (
    <ErrorBoundary>
      <ComicsList />
    </ErrorBoundary>
  )
}

export default ComicsPage
