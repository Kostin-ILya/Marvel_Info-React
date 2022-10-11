import { Routes, Route } from 'react-router-dom'

import {
  Layout,
  MainPage,
  ComicsPage,
  SingleComicPage,
  Page404,
} from '../../pages'

import ComicsList from '../ComicsList/ComicsList'

const App = () => {
  return (
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
  )
}

export default App
