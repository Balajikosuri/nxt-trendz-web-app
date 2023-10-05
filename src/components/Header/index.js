import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
// import {AiFillHome} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const renderThemeChanger = () => (
    <CartContext.Consumer>
      {values => {
        const {isDarkTheme, onToggleTheme} = values
        return (
          <button
            onClick={onToggleTheme}
            type="button"
            className="theme-toggle-btn"
          >
            <img
              className="toggle-theme-img"
              src={
                !isDarkTheme
                  ? '/img/light-theme-btn.png'
                  : '/img/dark-theme-btn.png'
              }
              alt="Theme toggle"
            />
          </button>
        )
      }}
    </CartContext.Consumer>
  )

  const renderCartItemsCount = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const cartItemsCount = cartList.length

        return (
          <>
            {cartItemsCount > 0 ? (
              <span className="cart-count-badge">{cartList.length}</span>
            ) : null}
          </>
        )
      }}
    </CartContext.Consumer>
  )

  return (
    <CartContext.Consumer>
      {values => {
        const {isDarkTheme} = values

        return (
          <nav className={`nav-header ${isDarkTheme && 'dark-mode-header-bg'}`}>
            <div className="nav-content">
              <div className="nav-bar-mobile-logo-container">
                <Link to="/">
                  <img
                    className="website-logo"
                    src={
                      isDarkTheme
                        ? '/img/white_nxt-removebg-preview.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'
                    }
                    alt="website logo"
                  />
                </Link>
                <div className="btn-group">
                  {renderThemeChanger()}
                  <button
                    type="button"
                    className="nav-mobile-btn"
                    onClick={onClickLogout}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                      alt="nav logout"
                      className="nav-bar-img"
                    />
                  </button>
                </div>
              </div>

              <div className="nav-bar-large-container">
                <Link to="/">
                  <img
                    className="website-logo"
                    src={
                      isDarkTheme
                        ? '/img/white_nxt-removebg-preview.png'
                        : 'https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'
                    }
                    alt="website logo"
                  />
                </Link>
                <ul className="nav-menu">
                  <li className="nav-menu-item">
                    <Link
                      to="/"
                      className={`nav-link ${
                        isDarkTheme && 'dark-mode-font-clr'
                      }`}
                    >
                      Home
                    </Link>
                  </li>

                  <li className="nav-menu-item">
                    <Link
                      to="/products"
                      className={`nav-link ${
                        isDarkTheme && 'dark-mode-font-clr'
                      }`}
                    >
                      Products
                    </Link>
                  </li>

                  <li className="nav-menu-item">
                    <Link
                      to="/cart"
                      className={`nav-link ${
                        isDarkTheme && 'dark-mode-font-clr'
                      }`}
                    >
                      Cart
                      {renderCartItemsCount()}
                    </Link>
                  </li>
                </ul>

                {renderThemeChanger()}
                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
            </div>

            <div className="nav-menu-mobile">
              <ul
                className={`nav-menu-list-mobile ${
                  isDarkTheme && 'dark-mode-header-bg'
                }`}
              >
                <li className="nav-menu-item-mobile">
                  <Link
                    to="/"
                    className={`nav-link ${
                      isDarkTheme && 'dark-mode-font-clr'
                    }`}
                  >
                    {/* <AiFillHome
                      className="mobile-tabicons"
                      size={24}
                      color="#6161ed"
                    /> */}
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
                      alt="nav home"
                      className="nav-bar-img"
                    />
                  </Link>
                </li>

                <li className="nav-menu-item-mobile">
                  <Link
                    to="/products"
                    className={`nav-link ${
                      isDarkTheme && 'dark-mode-font-clr'
                    }`}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
                      alt="nav products"
                      className="nav-bar-img"
                    />
                  </Link>
                </li>
                <li className="nav-menu-item-mobile">
                  <Link
                    to="/cart"
                    className={`nav-link ${
                      isDarkTheme && 'dark-mode-font-clr'
                    }`}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
                      alt="nav cart"
                      className="nav-bar-img"
                    />
                    {renderCartItemsCount()}
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
