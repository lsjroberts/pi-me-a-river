import React, { Component } from 'react';

import styles from './h3.scss';

export default class H3 extends Component {
  render() {
    const { children } = this.props;

    return (
      <h3 className={styles.default}>
        {children}
      </h3>
    );
  }
}
