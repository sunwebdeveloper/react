import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';

const Roteamento = () => (
  <Switch>
    <PrivateRoute exact path="/" component={Home} />
    <Route path="/login" component={LoginPage} />
  </Switch>
);

export default Roteamento;
