import { Routes, Route } from 'react-router-dom'

import { MainPage, ComicsPage, Layout } from '../../pages'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path="/comics" element={<ComicsPage />} />
      </Route>
    </Routes>
  )
}

export default App
