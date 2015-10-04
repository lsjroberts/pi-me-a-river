import React, { Component } from 'react';

import Header from '../Header/View';
import Search from '../Search/View';
import Footer from '../Footer/View';


export default class Home extends Component {
  render() {
    const { state, actions } = this.props;

    return (
      <section className="view home">
        <Header />
        <Search search={state.search} actions={actions} />
        <Footer />
      </section>
    );
  }
}