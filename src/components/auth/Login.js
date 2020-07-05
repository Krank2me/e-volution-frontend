import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { authLogin } from '../../services/AuthServices';
import Navar from '../Navbar';

const Login = (props) => {

  const [form, setForm] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const {data}  = await authLogin(form);
      const {user} = data;
      const auth = {
        uid: user.uid,
        email: user.email
      }
      localStorage.setItem('authUser', JSON.stringify(auth));
      props.history.push('/todos')
    } catch (error) {
    console.log("handleSubmit -> error", error);
    }
  }

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm({...form, [name]: value});
  }

  return (
    <React.Fragment>
      <Navar/>
      <form className="card card-body border-primary col-md-8" onSubmit={handleSubmit}>

          <div className="form-group input-group  ">
            <div className="input-group-text bg-light">
              <i className="material-icons">person</i>
            </div>
            <input type="email"
              className="form-control"
              placeholder="mail"
              name="email"
              onChange={handleChange}
              required="true"
            />
          </div>

          <div className="form-group input-group  ">
            <div className="input-group-text bg-light">
              <i className="material-icons">lock_outline</i>
            </div>
            <input type="password"
              className="form-control"
              placeholder="password"
              name="password"
              onChange={handleChange}
              required="true"
            />
          </div>

        <div className="d-flex flex-row">
          <button className="btn btn-primary btn-block col-md-2 ">Login</button>
        </div>

      </form>
    </React.Fragment>
  )
}

export default withRouter(Login);