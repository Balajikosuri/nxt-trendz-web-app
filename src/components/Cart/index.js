import Header from '../Header'
import CartListView from '../CartListView'

import CartContext from '../../context/CartContext'
import EmptyCartView from '../EmptyCartView'

import './index.css'

const Cart = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList, isDarkTheme} = value
      const showEmptyView = cartList.length === 0

      return (
        <div className="my-div">
          <Header />
          <div className="cart-container">
            {showEmptyView ? (
              <EmptyCartView />
            ) : (
              <div className="cart-content-container">
                <h1
                  className={`cart-heading ${isDarkTheme && 'dark-mode-blue'}`}
                >
                  My Cart
                </h1>
                <CartListView />
              </div>
            )}
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default Cart
