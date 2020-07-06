import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';

import TodoForm from './TodoForm'
import TodoServices from '../services/TodoServices';


const Todos = (props) => {

  const [todos, setTodos] = useState([]);
  const [currentId, setCurrentId] = useState('');
  const [userId, setUserId] = useState('');

  const getTodos = async (uid) => {
    const response = await TodoServices.getTodos(uid);
    setTodos(response.data);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    if (user && user.uid) {
      setUserId(user.uid);
      getTodos(user.uid);
    } else {
      props.history.push('/');
    }

  }, []);

  const addTodo = async (todoObject) => {
    if (currentId === '') {
      const response = await TodoServices.addTodo(todoObject);
      console.log("addTodo -> response", response);
      toast('New todo added', {type: 'success', autoClose: 2000});
      getTodos(userId);
    } else {
      upDateTodo({...todoObject, id: currentId});
      getTodos(userId);
    }
  };

  const upDateTodo = async (todoObject) => {
    const response = await TodoServices.updateTodo(todoObject);
    toast('Todo updated', {type: 'info', autoClose: 2000});
    setCurrentId('');
    console.log('*** responseData: ', response.data);
  };

  const deleteTodo = async (id) => {
    const isSure = window.confirm('are you sure you want delete this task?');
    if (isSure) {
      const response = await TodoServices.deleteTodo(id);
      toast('Todo deleted', {type: 'error', autoClose: 2000});
    }
    getTodos(userId);
  };

  return (
    <div className="container ">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="col-md-12 p-2">
            <TodoForm {...{addTodo, currentId, todos}}/>
          </div>
          <div className="col-md-12 p-2">
            {todos.map((todo) => (
              <div className="card mb-1" key={todo.id}>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h4>{todo.name}</h4>
                    <div>
                      <i className="material-icons text-danger" onClick={() => deleteTodo(todo.id)}>close</i>
                      <i className="material-icons text-danger" onClick={() => setCurrentId(todo.id)}>create</i>
                    </div>
                  </div>
                  <h4>{todo.priority.name}</h4>
                  <h4>{moment(todo.dueDate).format('LL')}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default withRouter(Todos);