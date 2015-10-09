import React, { Component } from 'react';

import {
  Header,
  Footer,
  Search,
  Results
} from '../components';

export default class Home extends Component {


  render() {
    const { state } = this.props;
    // const { term, rivers } = state;
    const term = '';
    const rivers = [];

    return (
      <section>
        <Header />
        <Search term={term} />
        <Results rivers={rivers} />
        <Footer />
      </section>
    );
  }
}
