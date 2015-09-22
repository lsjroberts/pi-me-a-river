import React, { Component } from 'react';

import Header from '../components/Header';
import Search from '../components/Search';
import Footer from '../components/Footer';


export default class Home extends Component {
  render() {
    const { rivers, actions } = this.props;

    return (
      <section className="view home">
        <Header />
        <Search rivers={rivers} actions={actions} />
        <Footer />
      </section>
    );
  }
}