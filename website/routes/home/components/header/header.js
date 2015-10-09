import React, { Component } from 'react';

import { H1, P } from '../../../../shared/components/Typography';

import styles from './header.scss';

export default class Header extends Component {
  render() {
    const { children } = this.props;

    return (
      <header className={styles.default}>
        <Content>
          <H1>Pi Me A River</H1>
          <P>A look into the data and relationships of the world's rivers</P>
        </Content>
      </header>
    );
  }
}
