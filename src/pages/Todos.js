import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../App.css';

import TodosComponent from '../components/Todos';

function Todos() {
  return (
    <div className="container p-4">
      <div className="row">
        <TodosComponent/>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Todos;
