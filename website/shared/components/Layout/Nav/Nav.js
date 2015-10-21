import React, { Component } from 'react';

import { List } from '../../Typography';

import styles from './nav.scss';

export default class Nav extends Component {
  render() {
    const { children } = this.props;

    return (
      <nav className={styles.default}>
        <List style="clean-inline">{children}</List>
      </nav>
    );
  }
}
