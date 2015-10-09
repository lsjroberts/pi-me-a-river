import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import '../../styles/app.scss';

class App extends Component {
  render () {
    const { location, children } = this.props;
    const { pathname } = location;

    return (
      <div>
        {children}
      </div>
    );
  }
}

function mapState (state) {
  return {
    state
  };
}

function mapDispatch (dispatch) {
  return { actions };
}

export default connect(mapState, mapDispatch)(App);
