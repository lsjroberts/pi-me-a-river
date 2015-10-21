import React, { Component } from 'react';

import styles from './h2.scss';

export default class H2 extends Component {
  render() {
    const { children } = this.props;

    return (
      <h2 className={styles.default}>
        {children}
      </h2>
    );
  }
}