import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found">
    <div className="not-found-content">
      <img
        className="not-found-img"
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1>Page Not Found</h1>
      <p>We are sorry, the page you requested could not be found</p>
      <Link className="link" to="/">
        <button className="not-found-btn" type="button">
          Go to Home
        </button>
      </Link>
    </div>
  </div>
)
export default NotFound
