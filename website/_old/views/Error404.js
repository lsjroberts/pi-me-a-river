import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';


export default class Error404 extends Component {
  render() {
    return (
      <section className="view error error-404">
        <Header />
        <h1>404 Not Found</h1>
        <Footer />
      </section>
    );
  }
}