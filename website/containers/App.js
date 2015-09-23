import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Home from '../views/Home';
import River from '../views/River';
import Error404 from '../views/Error404';

import * as RiverActions from  '../actions/RiverActions';
import * as views from '../constants/Views';

import '../styles/containers/app.scss';


class App extends Component {
  render() {
    const { view, rivers, actions } = this.props;

    console.log(this.props);

    switch (view) {
    case views.HOME:
      return (
        <Home rivers={rivers} actions={actions} />
      );

    case views.RIVER:
      let river = rivers[0];

      return (
        <River river={river} />
      );

    default:
      return (
        <Error404 />
      );
    }
  }
}

function mapState(state) {
  console.log('mapState', state);

  return {
    view: state.view,
    rivers: state.rivers
  };
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(RiverActions, dispatch)
  };
}

export default connect(mapState, mapDispatch)(App);
