import {Link} from 'react-router-dom'
import CartContext from '../../context/CartContext'

import './index.css'

const EmptyCartView = () => (
  <CartContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      return (
        <div className="cart-empty-view-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            className="cart-empty-img"
            alt="cart empty"
          />
          <h1
            className={`cart-empty-heading ${
              isDarkTheme && 'dark-mode-bold-font-clr'
            }`}
          >
            Your Cart Is Empty
          </h1>

          <Link to="/products">
            <button type="button" className="shop-now-btn">
              Shop Now
            </button>
          </Link>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default EmptyCartView
