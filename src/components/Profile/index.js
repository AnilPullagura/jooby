import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Profile extends Component {
  state = {status: apiConstants.initial, profileDetails: []}

  componentDidMount = () => {
    this.getApiCall()
  }

  getApiCall = async () => {
    this.setState({status: apiConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data.profile_details)
      const profileData = {
        name: data.profile_details.name,
        imageUrl: data.profile_details.profile_image_url,
        bio: data.profile_details.short_bio,
      }
      this.setState({status: apiConstants.success, profileDetails: profileData})
    } else {
      this.setState({status: apiConstants.failure})
    }
  }

  retryApiCall = () => {
    this.getApiCall()
  }

  renderFailureView = () => (
    <div className="profile-failure">
      <button onClick={this.retryApiCall} type="button" className="profile-btn">
        Retry
      </button>
    </div>
  )

  renderLoaderView = () => (
    <div className="profile-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccesView = () => {
    const {profileDetails} = this.state
    const {imageUrl, name, bio} = profileDetails
    return (
      <div>
        <div>
          <img className="profile" src={imageUrl} alt="profile" />
          <h1 className="name">{name}</h1>
        </div>
        <p className="bio">{bio}</p>
      </div>
    )
  }

  renderProfile = () => {
    const {status} = this.state
    switch (status) {
      case apiConstants.loading:
        return this.renderLoaderView()
      case apiConstants.success:
        return this.renderSuccesView()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return <div className="profile-box">{this.renderProfile()}</div>
  }
}
export default Profile
