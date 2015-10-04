import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import Router from '../components/Router/View';

import * as actions from  '../actions';

import '../styles/containers/app.scss';


class App extends Component {
  render() {
    const { state, actions } = this.props;

    return (
      <Router state={state} actions={actions} />
    );
  }
}

function mapState(state) {
  console.log('mapState', state);

  return { state };
}

function mapDispatch(dispatch) {
  let mappedActions = {};

  _.each(actions, function(componentActions, component) {
    mappedActions[component] = bindActionCreators(componentActions, dispatch);
  });

  console.log('mapDispatch', mappedActions);

  return {
    actions: mappedActions
  };
}

export default connect(mapState, mapDispatch)(App);
