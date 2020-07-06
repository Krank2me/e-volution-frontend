import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';

import { authSingUp } from '../../services/AuthServices';

const SingUp = (props) => {

  const [form, setForm] = useState();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      const {data}  = await authSingUp(form);
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
        <div className="form-group input-group col-md-6 col-lg-12">
          <div className="input-group-text bg-light">
            <i className="material-icons">person</i>
          </div>
          <input type="email"
            className="form-control"
            placeholder="mail"
            name="email"
            onChange={handleChange}
          />
        </div>

        <div className="form-group input-group col-md-6 col-lg-12">
          <div className="input-group-text bg-light">
            <i className="material-icons">lock_outline</i>
          </div>
          <input type="password"
            className="form-control"
            placeholder="password"
            name="password"
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary btn-block col-md-6 col-lg-12">
          SingUp
        </button>
      </form>
    </div>

  )
}

export default withRouter(SingUp);