import {NavLink} from 'react-router-dom'
import './index.css'
import CartContext from '../../context/CartContext'

const PaymentLoder = () => (
  <CartContext.Consumer>
    {value => {
      const {isDarkTheme} = value
      return (
        <div className={`payment-loader ${isDarkTheme && 'dark-mode-bg '}}`}>
          <div className="pad">
            <div className="chip">{}</div>
            <div className="line line1">{}</div>
            <div className="line line2">{}</div>
          </div>
          <div className="loader-text">
            Please wait while payment is loading
          </div>
          <NavLink className="go-back-btn" to="/cart">
            Go Back to Cart
          </NavLink>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default PaymentLoder
