import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';

const Navbar = (props) => {

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    if (user && user.uid) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  },[props]);

  const onLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('authUser');
    props.history.push('/');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">Todo</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor02">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/singup">Sing up</Link>
          </li>
          {
            isLogin
              ? (
                <li className="nav-item">
                  <button type="button" className="btn btn-primary" onClick={onLogout}>Logout</button>
                </li>
              )
              : null
          }

        </ul>
      </div>
      </nav>
  );
}

export default withRouter(Navbar);