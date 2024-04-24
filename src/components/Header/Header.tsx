import { NavLink } from "react-router-dom"
import cn from 'classnames'

const Header = () => {
  return (
    <header className='header'>
    <nav className="header__nav nav">
      <ul className="nav__list">
        <li className="nav__list-item">
          <NavLink
            to='/todos'
            className={({ isActive }) => cn(
              'nav__list-item-link',
              { 'nav__list-item-link--active': isActive }
            )}
          >
            All
          </NavLink>
        </li>
        <li className="nav__list-item">
          <NavLink
            to='/deleted'
            className={({ isActive }) => cn(
              'nav__list-item-link',
              { 'nav__list-item-link--active': isActive }
            )}
          >
            Deleted
          </NavLink>
        </li>
      </ul>
    </nav>
  </header>
  )
}

export default Header
