import React, { Component } from 'react';

import Home from '../Home/View';


export default class Router extends Component {
  render () {
    const { state, actions } = this.props;
    const { route } = state;

    let Component = this.getComponent(route);

    return (
      <Component state={state} actions={actions} />
    );
  }

  getComponent (route) {
    return Home;
  }
}
