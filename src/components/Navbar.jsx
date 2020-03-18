import React from 'react'
import {NavLink} from 'react-router-dom'

export const Navbar = props => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <NavLink className="navbar-brand" to="/">MyBudget</NavLink>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/history">History</NavLink>
              </li>
            </ul>
        </nav>)
}