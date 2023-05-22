import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <nav className="col-md-2 d-none d-md-block sidebar">
      <div className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              <i className="fas fa-home"></i> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/AskQuestion" className="nav-link">
              <i className="fas fa-question-circle"></i> Ask a question
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
