import React from 'react';
import { Route, IndexRoute } from 'react-router';

// import * as actions from './modules/actions';

import App from './shared/containers/app';
import { Home } from './routes/home';
import { Styleguide } from './routes/styleguide';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/styleguide" component={Styleguide} />
  </Route>
);
