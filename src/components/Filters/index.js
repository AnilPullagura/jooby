import {Component} from 'react'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]
const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]
const locations = [
  {
    label: 'HYderabad',
    locationId: 'HYDERABAD',
  },
  {
    label: 'Banglore',
    locationId: 'BANGLORE',
  },
  {
    label: 'Chennai',
    locationId: 'CHENNAI',
  },
  {
    label: 'Delhi',
    locationId: 'DELHI',
  },
  {
    label: 'Mumbai',
    locationId: 'MUMBAI',
  },
]

class Filters extends Component {
  onChangeCheklist = value => {
    const {updateCheckList} = this.props
    updateCheckList(value)
  }

  onchangeRaido = value => {
    const {updateRadioInput} = this.props
    updateRadioInput(value)
  }

  clearAllFilter = () => {
    const {clearFilters} = this.props
    clearFilters()
  }

  onchangeLocation = value => {
    const {updateLocation} = this.props
    updateLocation(value)
  }

  render() {
    const {employmentTypeList, selectedSalary} = this.props
    return (
      <div className="checkbox-container">
        <h1 className="types-head">Type of Employment</h1>
        <ul className="checkbox-div">
          {employmentTypesList.map(each => (
            <li>
              <label key={each.employmentTypeId}>
                <input
                  type="checkbox"
                  value={each.employmentTypeId}
                  checked={employmentTypeList.includes(each.employmentTypeId)}
                  onChange={() => this.onChangeCheklist(each.employmentTypeId)}
                />
                {each.label}
              </label>
            </li>
          ))}
        </ul>
        <hr />
        <div className="checkbox-div">
          <h1 className="types-head">Salary Range</h1>
          <ul>
            {salaryRangesList.map(each => (
              <li>
                <label key={each.salaryRangeId}>
                  <input
                    type="radio"
                    name="salary"
                    checked={selectedSalary === each.salaryRangeId}
                    onClick={() => this.onchangeRaido(each.salaryRangeId)}
                    readOnly
                    value={each.salaryRangeId}
                  />
                  {each.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <hr />
        <div className="checkbox-div">
          <h1>Location</h1>
          <ul>
            {locations.map(each => (
              <li>
                <label key={each.locationId}>
                  <input
                    type="checkbox"
                    value={each.locationId}
                    checked={locations.includes(each.locationId)}
                    onChange={() => this.onchangeLocation(each.locationId)}
                  />
                  {each.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="clear-btn"
          type="button"
          onClick={this.clearAllFilter}
        >
          Clear Filters
        </button>
      </div>
    )
  }
}

export default Filters
