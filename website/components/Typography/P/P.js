import React, { Component } from 'react';

import styles from './p.scss';

export default class P extends Component {
  render() {
    const { children } = this.props;

    return (
      <p className={styles.default}>
        {children}
      </p>
    );
  }
}
