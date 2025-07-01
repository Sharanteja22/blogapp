import React from 'react'
import { Link, Outlet } from 'react-router-dom'
function AuthorProfile() {
  return (
    <div className='d-flex flex-column '>
      <nav className="navbar   navbar-expand-lg w-100 navbar-light bg-dark" >
        <Link className="navbar-brand" to="">Author</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="articles">Articles</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="article">Add New Article</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div><Outlet /></div>
    </div>
  )
}

export default AuthorProfile