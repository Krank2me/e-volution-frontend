import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Todos from './pages/Todos';
import Login from './pages/Login';
import SingUp from './pages/SingUp';
import Navbar from './components/Navbar';

const App = () => (
  <Router>
    <Navbar/>
    <Switch>
      <Route
        path="/todos"
        exact
        component={Todos}
      />
      <Route
        path="/"
        exact
        component={Login}
      />
      <Route
        path="/singup"
        exact
        component={SingUp}
      />
    </Switch>
  </Router>
);

export default  App;