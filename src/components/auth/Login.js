import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { authLogin } from '../../services/AuthServices';

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
    <div className="p-4">
      <form className="container card card-body border-primary col-md-4 mt-4" onSubmit={handleSubmit}>

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
          <button className="btn btn-primary btn-block col-md-12 ">Login</button>
        </div>

      </form>
    </div>
  )
}

export default withRouter(Login);