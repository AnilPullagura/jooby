import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsBriefcaseFill} from 'react-icons/bs'

import {FaStar} from 'react-icons/fa'

import {VscLinkExternal} from 'react-icons/vsc'
import Header from '../Header'
import SimilarJobItem from '../SimilarItem'

import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobDetailSection extends Component {
  state = {jobDetails: [], status: apiConstants.initial}

  componentDidMount = () => {
    this.getApiCall()
  }

  getApiCall = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    this.setState({status: apiConstants.loading})
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobObj = this.getJobData(data)
      this.setState({jobDetails: jobObj, status: apiConstants.success})
    } else {
      this.setState({status: apiConstants.failure})
    }
  }

  getJobData = data => {
    const updatedData = data.job_details
    const smilarJobDetails = data.similar_jobs
    const jobObjData = {
      companyLogo: updatedData.company_logo_url,
      companyWebsiteUrl: updatedData.company_website_url,
      employmentType: updatedData.employment_type,
      id: updatedData.id,
      description: updatedData.job_description,
      lifeAtCompany: {
        companyDescription: updatedData.life_at_company.description,
        imageUrl: updatedData.life_at_company.image_url,
      },
      title: updatedData.title,
      location: updatedData.location,
      packagePerAnnum: updatedData.package_per_annum,
      rating: updatedData.rating,
      skills: updatedData.skills.map(each => ({
        name: each.name,
        skillImageUrl: each.image_url,
      })),
      similarJobs: smilarJobDetails.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        id: each.id,
        jobDescription: each.job_description,
        location: each.location,
        rating: each.rating,
        title: each.title,
      })),
    }
    return jobObjData
  }

  renderUI = () => {
    const {status} = this.state
    switch (status) {
      case apiConstants.loading:
        return this.renderLoadingView()
      case apiConstants.success:
        return this.renderSuccessView()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  renderSkills = () => {
    const {jobDetails} = this.state
    const {skills} = jobDetails
    return (
      <ul className="skill-list">
        {skills.map(each => (
          <li className="list-view" key={each.name}>
            <div className="skills-item">
              <img
                className="skill-img"
                src={each.skillImageUrl}
                alt={each.name}
              />
              <p>{each.name}</p>
            </div>
          </li>
        ))}
      </ul>
    )
  }

  renderSimilarJobs = () => {
    const {jobDetails} = this.state
    const {similarJobs} = jobDetails
    return (
      <div className="similar-jobs-container">
        <h1 className="similar-job-head">Similar Jobs</h1>
        <ul className="similar-job-list">
          {similarJobs.map(each => (
            <SimilarJobItem details={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderSuccessView = () => {
    const {jobDetails} = this.state
    const {
      companyLogo,
      companyWebsiteUrl,
      employmentType,
      title,
      description,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
    } = jobDetails
    const {companyDescription, imageUrl} = lifeAtCompany
    return (
      <div className="detail-section-view">
        <div className="detail-view-logo-container">
          <img
            src={companyLogo}
            alt="company logo"
            className="detail-section-company-logo"
          />
          <div>
            <h1>{title}</h1>
            <div>
              <FaStar className="star-view-img" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-view-container">
          <div className="location-details">
            <div className="location">
              <p>{location}</p>
            </div>
            <div className="type">
              <BsBriefcaseFill />
              <p>{employmentType}</p>
            </div>
          </div>
          <p>{packagePerAnnum}</p>
        </div>
        <hr />
        <div className="view-link">
          <p>Description</p>
          <a className="navigate-link" href={companyWebsiteUrl} target="blank">
            Visit <VscLinkExternal />
          </a>
        </div>
        <h1>{description}</h1>
        <h1 className="skill">Skills</h1>
        {this.renderSkills()}
        <div className="life-at-company">
          <h1>Life at Company</h1>
          <div className="life-view">
            <p className="description">{companyDescription}</p>
            <img
              className="life-at-company-img"
              src={imageUrl}
              alt="life at company"
            />
          </div>
        </div>
        {this.renderSimilarJobs()}
      </div>
    )
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-view-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-view-img"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.getApiCall}>
        Retry
      </button>
    </div>
  )

  render() {
    return (
      <div className="detail-section-container">
        <Header />
        <div className="job-detail-section">{this.renderUI()}</div>
      </div>
    )
  }
}
export default JobDetailSection
