// Enable ES6 promises
import 'babel-core/polyfill';

import React from 'react';

import AppProvider from './containers/AppProvider';

React.render(
  <AppProvider />,
  document.getElementById('root')
);
