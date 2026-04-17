import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Profile from '../Profile'
import JobItem from '../JobItem'
import Filters from '../Filters'
import './index.css'

const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Jobs extends Component {
  state = {
    jobList: [],
    status: apiConstants.initial,
    searchInput: '',
    employmentTypeList: [],
    selectedSalary: '',
    location: [],
  }

  componentDidMount() {
    this.getApiJobs()
  }

  getApiJobs = async () => {
    const {
      searchInput,
      employmentTypeList,
      selectedSalary,
      location,
    } = this.state
    this.setState({status: apiConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeList}&search=${searchInput}&minimum_package=${selectedSalary}&location=${location}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const respone = await fetch(url, options)
    if (respone.ok === true) {
      const data = await respone.json()
      const jobsData = this.getjobData(data.jobs)
      this.setState({status: apiConstants.success, jobList: jobsData})
    } else {
      this.setState({status: apiConstants.failure})
    }
  }

  getjobData = data => {
    const updatedData = data.map(eachData => ({
      companyLogo: eachData.company_logo_url,
      employmentType: eachData.employment_type,
      id: eachData.id,
      jobDescription: eachData.job_description,
      location: eachData.location,
      packagePerAnnum: eachData.package_per_annum,
      rating: eachData.rating,
      title: eachData.title,
    }))
    return updatedData
  }

  changeInput = event => {
    this.setState({searchInput: event.target.value}, this.getApiJobs)
  }

  updateCheckList = value => {
    this.setState(prevState => {
      const isExist = prevState.employmentTypeList.includes(value)
      return {
        employmentTypeList: isExist
          ? prevState.employmentTypeList.filter(item => item !== value)
          : [...prevState.employmentTypeList, value],
      }
    }, this.getApiJobs)
  }

  updateLocation = value => {
    console.log(value)
    this.setState(prevState => {
      const isExist = prevState.location.includes(value)
      return {
        location: isExist
          ? prevState.location.filter(item => item !== value)
          : [...prevState.location, value],
      }
    }, this.getApiJobs)
  }

  updateRadioInput = value => {
    this.setState(
      prevState => ({
        selectedSalary: prevState.selectedSalary === value ? '' : value,
      }),
      this.getApiJobs,
    )
  }

  clearFilters = () => {
    this.setState(
      {selectedSalary: '', employmentTypeList: [], location: []},
      this.getApiJobs,
    )
  }

  retryApicall = () => {
    this.getApiJobs()
  }

  renderLoaderView = () => (
    <div data-testid="loader" className="job-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <div className="failure-contents">
        <img
          className="failure-img"
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1 className="failure-heading"> Oops! Something Went Wrong</h1>
        <p className="failure-para">
          We cannot seem to find the page you are looking for
        </p>
        <button
          className="failure-btn"
          onClick={this.retryApicall}
          type="button"
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderJobsList = () => {
    const {jobList} = this.state
    return (
      <div>
        {jobList.length > 0 ? (
          <ul>
            {jobList.map(eachJob => (
              <JobItem details={eachJob} key={eachJob.id} />
            ))}
          </ul>
        ) : (
          <div className="not-found">
            <img
              className="not-found-img"
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
            />
            <h1>No Jobs Found</h1>
            <p>We could not find any jobs. Try other filters.</p>
          </div>
        )}
      </div>
    )
  }

  renderJobs = () => {
    const {status} = this.state
    switch (status) {
      case apiConstants.loading:
        return this.renderLoaderView()
      case apiConstants.success:
        return this.renderJobsList()
      case apiConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput, selectedSalary, employmentTypeList} = this.state
    return (
      <div className="job-container">
        <Header />
        <div className="job-content-container">{this.renderJobs()}</div>
        <div className="profile-container">
          <div className="search-bar">
            <input
              onChange={this.changeInput}
              value={searchInput}
              className="input"
              placeholder="Search"
              type="search"
            />
            <button
              type="button"
              data-testid="searchButton"
              className="search-box"
            >
              <BsSearch className="search-icon" />
            </button>
          </div>
          <Profile />
          <Filters
            clearFilters={this.clearFilters}
            employmentTypeList={employmentTypeList}
            selectedSalary={selectedSalary}
            updateCheckList={this.updateCheckList}
            updateRadioInput={this.updateRadioInput}
            updateLocation={this.updateLocation}
          />
        </div>
      </div>
    )
  }
}
export default Jobs
