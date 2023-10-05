import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'
import CartContext from '../../context/CartContext'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    showPassword: false,
  }

  onTogglePassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderPasswordField = () => {
    const {password, showPassword} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <>
              <label
                className={`input-label ${isDarkTheme && 'dark-mode-font-clr'}`}
                htmlFor="password"
              >
                PASSWORD
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="password-input-field"
                value={password}
                onChange={this.onChangePassword}
                placeholder="Password"
              />
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <CartContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <>
              <label
                className={`input-label ${isDarkTheme && 'dark-mode-font-clr'}`}
                htmlFor="password"
              >
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="username-input-field"
                value={username}
                onChange={this.onChangeUsername}
                placeholder="Username"
              />
            </>
          )
        }}
      </CartContext.Consumer>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <CartContext.Consumer>
        {value => {
          const {isDarkTheme} = value
          return (
            <div
              className={`login-form-container ${
                isDarkTheme && 'dark-mode-bg'
              }`}
            >
              <img
                src={
                  isDarkTheme
                    ? 'img/nxt-trendz-dark-img.png'
                    : 'https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'
                }
                className="login-website-logo-mobile-img"
                alt="website logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
                className="login-img"
                alt="website login"
              />
              <form
                className={`form-container ${
                  isDarkTheme && 'dark-mode-form-card'
                }`}
                onSubmit={this.submitForm}
              >
                <img
                  src={
                    isDarkTheme
                      ? 'img/nxt-trendz-dark-img.png'
                      : 'https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'
                  }
                  className="login-website-logo-desktop-img"
                  alt="website logo"
                />
                <div className="input-container">
                  {this.renderUsernameField()}
                </div>
                <div className="input-container">
                  {this.renderPasswordField()}
                </div>
                <div className="my-input-container">
                  <input
                    onChange={this.onTogglePassword}
                    type="checkbox"
                    id="toggle-password"
                    className="my-checkbox"
                  />
                  <label htmlFor="toggle-password" className="my-label">
                    Show password
                  </label>
                </div>
                <button type="submit" className="login-button">
                  Login
                </button>
                {showSubmitError && (
                  <p className="error-message">*{errorMsg}</p>
                )}
                <div className="user-login-details">
                  <details>
                    <summary>Sample Login Details</summary>
                    <div className="user-cred-group">
                      <div>
                        <b>Prime User</b>
                        <br />
                        <span>
                          Username: <b> rahul</b>
                        </span>
                        <br />
                        <span>
                          Password: <b> rahul@2021</b>
                        </span>
                      </div>
                      <div>
                        <b>Non-Prime User</b>
                        <br />
                        <span>
                          Username: <b> raja</b>
                        </span>
                        <br />
                        <span>
                          Password: <b> raja@2021</b>
                        </span>
                      </div>
                    </div>
                  </details>
                </div>
              </form>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default LoginForm
