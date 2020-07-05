import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm'
import TodoServices from '../services/TodoServices';
import { toast } from 'react-toastify';

const Todos = () => {

  const [todos, setTodos] = useState([]);
  const [currentId, setCurrentId] = useState('');

  const getTodos = async () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    const response = await TodoServices.getTodos(user.uid);
    setTodos(response.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async (todoObject) => {
    if (currentId === '') {
      const response = await TodoServices.addTodo(todoObject);
      toast('New todo added', {type: 'success', autoClose: 2000});
      getTodos();
    } else {
      upDateTodo({...todoObject, id: currentId});
      getTodos();
    }
  };

  const upDateTodo = async (todoObject) => {
    const response = await TodoServices.updateTodo(todoObject);
    toast('Todo updated', {type: 'info', autoClose: 2000});
    setCurrentId('');
  };

  const deleteTodo = async (id) => {
    const isSure = window.confirm('are you sure you want delete this task?');
    if (isSure) {
      const response = await TodoServices.deleteTodo(id);
      toast('Todo deleted', {type: 'error', autoClose: 2000});
    }
    getTodos();
  };

  return (
    <div>
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
              <h4>{todo.dueDate}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Todos;