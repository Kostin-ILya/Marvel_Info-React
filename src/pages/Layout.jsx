import { Outlet } from 'react-router-dom'

import AppHeader from '../components/AppHeader/AppHeader'

const Layout = () => {
  return (
    <div className="app">
      <AppHeader />

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
