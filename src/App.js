import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'
import CopyrightBar from './components/copyright'
import PaymentLoder from './components/PaymentLoder'

class App extends Component {
  state = {
    cartList: [],
    isDarkTheme: false,
  }

  onToggleTheme = () => {
    console.log('btn-clicked')
    this.setState(prevState => ({isDarkTheme: !prevState.isDarkTheme}))
  }

  addCartItem = (product, id) => {
    const {cartList} = this.state
    if (cartList.find(eachProduct => eachProduct.id === id)) {
      const updatedCartList = cartList.map(eachProduct => {
        if (eachProduct.id === id) {
          return {...eachProduct, ...product}

          // Return the modified product
        }
        alert('Your Item Added To Cart Successfully !')
        return eachProduct // Return unchanged product if ID doesn't match
      })

      this.setState({cartList: updatedCartList})
    } else {
      this.setState({cartList: [...cartList, product]})
      alert('Your Item Added To Cart Successfully !')
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const filteredCartList = cartList.filter(
      eachProduct => eachProduct.id !== id,
    )
    this.setState({cartList: filteredCartList})
  }

  incrementCartItemQuantity = itemId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.id === itemId ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  decrementCartItemQuantity = itemId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.id === itemId && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    }))
  }

  render() {
    const {cartList, isDarkTheme} = this.state
    console.table(cartList)

    return (
      <CartContext.Provider
        value={{
          cartList,
          isDarkTheme,
          onToggleTheme: this.onToggleTheme,

          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <div className={`app ${isDarkTheme && 'dark-mode-bg'}`}>
          <>
            <Switch>
              <Route exact path="/login" component={LoginForm} />
              <ProtectedRoute exact path="/home" component={Home} />
              <ProtectedRoute exact path="/products" component={Products} />
              <ProtectedRoute
                exact
                path="/products/:id"
                component={ProductItemDetails}
              />
              <ProtectedRoute exact path="/cart" component={Cart} />
              <ProtectedRoute exact path="/checkout" component={PaymentLoder} />
              <Route path="/not-found" component={NotFound} />
              <Redirect to="not-found" />
            </Switch>
          </>
          <CopyrightBar />
        </div>
      </CartContext.Provider>
    )
  }
}

export default App
