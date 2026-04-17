import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link, withRouter} from 'react-router-dom'

import {MdHome} from 'react-icons/md'

import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FaAward} from 'react-icons/fa'
import './index.css'

class Header extends Component {
  state = {status: ''}

  changeStatus = value => {
    this.setState({status: value})
  }

  logout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {status} = this.state
    const homeClass = status === 'HOME' ? 'click' : ''
    const aboutClass = status === 'JOB' ? 'clicked' : ''
    return (
      <div>
        <div className="header-container">
          <div>
            <Link className="link" to="/">
              <img
                className="website-logo"
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
              />
            </Link>
          </div>
          <hr className="horizontol-line" />
          <div className="header-btn-container">
            <Link to="/login" className="log-out-section-container">
              <button
                onClick={this.logout}
                className="log-out-btn"
                type="button"
              >
                Log out
              </button>
            </Link>
            <button className="premium-pass-btn" type="button">
              Premium
              <FaAward className="premium-icon" />
            </button>
          </div>
          <div className="route-control-container">
            <Link className="link" to="/">
              <h1
                onClick={() => this.changeStatus('HOME')}
                className={`${homeClass} home-link`}
              >
                Home
              </h1>
            </Link>
            <Link className="link" to="/jobs">
              <h1
                onClick={() => this.changeStatus('JOB')}
                className={`${aboutClass} about-link`}
              >
                Jobs
              </h1>
            </Link>
          </div>
        </div>
        <div className="header-mobile-view">
          <Link to="/" className="link">
            <img
              className="website-logo-mobile-view"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website-logo"
            />
          </Link>
          <div className="mobile-view-link-controll">
            <ul>
              <Link to="/">
                <li>
                  <button type="button" className="sample-btn">
                    <MdHome className="mobile-home-icon" />
                  </button>
                </li>
              </Link>
              <Link to="/jobs">
                <li>
                  <button type="button" className="sample-btn">
                    <BsFillBriefcaseFill className="mobile-job-icon" />
                  </button>
                </li>
              </Link>
              <Link to="/login">
                <li>
                  <button
                    onClick={this.logout}
                    type="button"
                    className="sample-btn"
                  >
                    Logout
                  </button>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)
