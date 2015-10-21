import React, { Component } from 'react';

import {
  Header,
  Footer,
  Search
} from '../components';

export default class Home extends Component {
  handleChange(e) {
    console.log('Home.handleChange');
    console.log(e);
    this.props.actions.search.updateTerm(e.text);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const { state } = this.props;
    // const { term, rivers } = state;
    const term = '';
    const rivers = [];

    console.log(this.props);

    return (
      <section>
        <Header />
        <Search
          term={term}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          />
        <Footer />
      </section>
    );
  }
}
