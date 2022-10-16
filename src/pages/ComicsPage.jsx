import { Outlet } from 'react-router-dom'

import AppBanner from '../components/AppBanner/AppBanner'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'

const ComicsPage = () => {
  return (
    <ErrorBoundary>
      <AppBanner />
      <Outlet />
    </ErrorBoundary>
  )
}

export default ComicsPage
