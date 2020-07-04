import React, { useState, useEffect } from 'react';
import TodoServices from '../services/TodoServices';

const LinkForm = (props) => {

  const initialStateValues = {
    name: '',
    priority: '',
    dueDate: ''
  };

  const [values, setValues] = useState(initialStateValues);
  const [priorities, setPriorities] = useState([]);

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]: value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(values);
    props.addTodo(values);
    setValues({...initialStateValues});
  }

  const getTodosByid = async (id) => {
    const response = await TodoServices.getTodoById(id);
    console.log('*** getTodosByid: ', response.data);
    setValues({...response.data})
  };

  const getPriorities = async () => {
    const response = await TodoServices.getPriorities();
    console.log('*** getTodosByid: ', response.data);
    setPriorities(response.data)
  };

  useEffect(() => {
    if (props.currentId === '') {
      setValues({...initialStateValues});
    } else {
      getTodosByid(props.currentId);
    }
  }, [props.currentId]);

  useEffect(() => {
    getPriorities();
  }, []);

  return (
    <form className="card card-body border-primary" onSubmit={handleSubmit}>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">person</i>
        </div>
        <input type="text"
          className="form-control"
          placeholder="Name"
          name="name"
          onChange={handleInputChange}
          value={values.name}
        />
      </div>

      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">warning</i>
        </div>
        <select name="priority" onChange={handleInputChange} className="form-control">
          {priorities.map(priority => {
            console.log('*** values: ', values);

            return (
            <option
              selected={values.priority === priority.id}
              key={priority.id}
              value={priority.id}>
                {priority.name}
            </option>
            )
          })}
        </select>
      </div>

      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">event</i>
        </div>
        <input type="date"
          className="form-control"
          placeholder="Due date"
          name="dueDate"
          onChange={handleInputChange}
          value={values.dueDate}
        />
      </div>

      <button className="btn btn-primary btn-block">
        {props.currentId === '' ? 'Save' : 'Update'}
      </button>
    </form>
  )
};

export default LinkForm;