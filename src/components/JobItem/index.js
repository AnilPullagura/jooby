import {Component} from 'react'
import {Link} from 'react-router-dom'
import {BsBriefcaseFill} from 'react-icons/bs'

import {FaStar} from 'react-icons/fa'
import './index.css'

class JobItem extends Component {
  render() {
    const {details} = this.props
    const {
      companyLogo,
      employmentType,
      id,
      jobDescription,
      packagePerAnnum,
      location,
      rating,
      title,
    } = details
    return (
      <Link className="link" to={`/jobs/${id}`}>
        <li className="list-item">
          <div className="job-item-container">
            <div className="company-logo-container">
              <img className="company-logo" src={companyLogo} alt={title} />
              <div>
                <h1 className="title">{title}</h1>
                <div className="rating-container">
                  <FaStar className="star" />
                  <p>{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-container">
              <div className="location-work-container">
                <div className="location-box">
                  <p>{location}</p>
                </div>
                <div className="work-type">
                  <BsBriefcaseFill />
                  <p>{employmentType}</p>
                </div>
              </div>
              <p>{packagePerAnnum}</p>
            </div>
            <hr className="horizontal-line" />
            <p>Description</p>
            <h1>{jobDescription}</h1>
          </div>
        </li>
      </Link>
    )
  }
}
export default JobItem
