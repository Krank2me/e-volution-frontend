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
      await TodoServices.addTodo(todoObject);
      toast('New todo added', {type: 'success', autoClose: 2000});
      getTodos(userId);
    } else {
      upDateTodo({...todoObject, id: currentId});
      getTodos(userId);
    }
  };

  const upDateTodo = async (todoObject) => {
    await TodoServices.updateTodo(todoObject);
    toast('Todo updated', {type: 'info', autoClose: 2000});
    setCurrentId('');
  };

  const deleteTodo = async (id) => {
    const isSure = window.confirm('are you sure you want delete this task?');
    if (isSure) {
      await TodoServices.deleteTodo(id);
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
                <h4 className="text-primary">Name:</h4>
                  <div className="d-flex justify-content-between">
                    <h5>{todo.name}</h5>
                    <div>
                      <i className="material-icons text-danger" onClick={() => deleteTodo(todo.id)}>close</i>
                      <i className="material-icons text-danger" onClick={() => setCurrentId(todo.id)}>create</i>
                    </div>
                  </div>
                  <h4 className="text-primary">Priority:</h4>
                  <h5>{todo.priority.name}</h5>
                  <h4 className="text-primary">Due date:</h4>
                  <h5>{moment(todo.dueDate).format('LL')}</h5>
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