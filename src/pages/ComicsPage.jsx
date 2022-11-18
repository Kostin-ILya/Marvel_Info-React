import { Helmet } from 'react-helmet'
import { Outlet } from 'react-router-dom'

import AppBanner from '../components/AppBanner/AppBanner'
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary'

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel comics page" />
        <title>Marvel comics page</title>
      </Helmet>

      <ErrorBoundary>
        <AppBanner />

        <Outlet />
      </ErrorBoundary>
    </>
  )
}

export default ComicsPage
