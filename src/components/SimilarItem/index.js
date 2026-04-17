import {Component} from 'react'
import {FaStar} from 'react-icons/fa'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

class SimilarJobItem extends Component {
  render() {
    const {details} = this.props
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
    } = details
    return (
      <li className="similar-container">
        <div className="similar-item-logo">
          <img
            className="similar-logo"
            src={companyLogoUrl}
            alt="similar job company logo"
          />
          <div>
            <h1 className="title">{title}</h1>
            <p className="similar-flex-para">
              <FaStar className="similar-star" />
              {rating}
            </p>
          </div>
        </div>
        <p className="bold-text">Description</p>
        <p>{jobDescription}</p>
        <div className="location-details">
          <p className="similar-flex-para">{location}</p>
          <p className="similar-flex-para">
            <BsBriefcaseFill className="type" />
            {employmentType}
          </p>
        </div>
      </li>
    )
  }
}
export default SimilarJobItem
