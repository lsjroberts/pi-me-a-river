import React, { Component } from 'react';

import Footer from '../components/Footer';
import RiverComponent from '../components/River';


export default class River extends Component {
  render() {
    const { river } = this.props;

    console.log(river);

    return (
      <section className="view river">
        <RiverComponent river={river} />
        <Footer />
      </section>
    );
  }
}