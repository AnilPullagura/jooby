import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errMsg: ''}

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    this.getApicall(userDetails)
  }

  loginFailure = data => {
    this.setState({errMsg: data.error_msg})
  }

  letUserLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  getApicall = async userDetails => {
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      this.letUserLogin(data.jwt_token)
    } else {
      const data = await response.json()
      this.loginFailure(data)
    }
  }

  renderInputFields = () => {
    const {username} = this.state
    return (
      <div className="input-box">
        <label className="username" htmlFor="username">
          USERNAME
        </label>
        <input
          onChange={this.changeUsername}
          value={username}
          type="text"
          id="username"
          placeholder="Username"
          className="input-field"
        />
      </div>
    )
  }

  renderPassField = () => {
    const {password} = this.state
    return (
      <div className="input-box">
        <label className="password" htmlFor="password">
          PASSWORD
        </label>
        <input
          onChange={this.changePassword}
          value={password}
          type="password"
          id="password"
          placeholder="Password"
          className="input-field"
        />
      </div>
    )
  }

  render() {
    const {errMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-box">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="login-logo"
          />
          <form onSubmit={this.submitForm}>
            {this.renderInputFields()}
            {this.renderPassField()}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          {errMsg && <p>*{errMsg}</p>}
        </div>
      </div>
    )
  }
}
export default Login
