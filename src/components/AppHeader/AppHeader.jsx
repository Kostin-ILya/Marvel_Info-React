import { Link, NavLink } from 'react-router-dom'

import './appHeader.scss'

const AppHeader = () => {
  const setActive = ({ isActive }) => (isActive ? 'active-link' : null)

  return (
    <header className="app__header">
      <h1 className="app__title">
        <a href="/">
          <span>Marvel</span> information portal
        </a>
      </h1>
      <nav className="app__menu">
        <ul>
          <li>
            <NavLink to="/" className={setActive}>
              Characters
            </NavLink>
          </li>
          /
          <li>
            <NavLink to="/comics" className={setActive}>
              Comics
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader
