import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import NodePage from './containers/NodePage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.NODE} component={NodePage} />
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
