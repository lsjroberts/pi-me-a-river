import React, { Component } from 'react';
import { createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';

// import { devTools, persistState } from 'redux-devtools';
// import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import * as reducers from '../reducers';
import RiverApp from './RiverApp';


// const finalCreateStore = compose(
  // devTools(),
  // persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
// )(createStore);
const finalCreateStore = createStore;

const reducer = combineReducers(reducers);
const store = finalCreateStore(reducer);

if (module.hot) {
  module.hot.accept('../reducers', () =>
    store.replaceReducer(combineReducers(require('../reducers')))
  );
}


export default class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          {() => <RiverApp />}
        </Provider>
      </div>
    );
  }
}
