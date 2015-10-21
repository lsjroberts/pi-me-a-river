import React, { Component } from 'react';

import styles from './h1.scss';

export default class H1 extends Component {
  render() {
    const { children } = this.props;

    return (
      <h1 className={styles.default}>
        {children}
      </h1>
    );
  }
}
