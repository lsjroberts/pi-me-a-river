import React, { Component } from 'react';

import { H1, P } from '../../../shared/typography';

import styles from './header.scss';

export default class Header extends Component {
  render() {
    const { children } = this.props;

    return (
      <header>
        <H1>Pi Me A River</H1>
        <P>foo</P>
      </header>
    );
  }
}
