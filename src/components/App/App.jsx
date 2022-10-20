import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from '../../pages/Layout'
import ComicsList from '../ComicsList/ComicsList'
import Spinner from '../loadingStatus/Spinner/Spinner'

const MainPage = lazy(() => import('../../pages/MainPage'))
const ComicsPage = lazy(() => import('../../pages/ComicsPage'))
const Page404 = lazy(() => import('../../pages/Page404/Page404'))
const SingleComicPage = lazy(() =>
  import('../../pages/SingleComicPage/SingleComicPage')
)

const App = () => {
  return (
    <Suspense fallback={<Spinner center />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="/comics" element={<ComicsPage />}>
            <Route index element={<ComicsList />} />
            <Route path=":id" element={<SingleComicPage />} />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App
