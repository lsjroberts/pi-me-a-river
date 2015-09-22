import React, { Component } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import RiverComponent from '../components/River';


export default class River extends Component {
  render() {
    const { river } = this.props;

    console.log(river);

    return (
      <section className="view river">
        <Header />
        <RiverComponent river={river} />
        <Footer />
      </section>
    );
  }
}