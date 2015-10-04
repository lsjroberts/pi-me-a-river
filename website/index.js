// Enable ES6 promises
import 'babel-core/polyfill';

import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import App from './containers/App';
import Index from './routes/index/index';
import Styleguide from './containers/Styleguide';
import configureStore from './store/configureStore';

const history = createBrowserHistory();
const store = configureStore();

React.render(
  <Provider store={store}>
    {() =>
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={Index} />

          <Route path="styleguide" component={Styleguide} />
        </Route>
      </Router>
    }
  </Provider>,
  document.getElementById('root')
);
