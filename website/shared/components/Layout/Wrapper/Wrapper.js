import React, { Component } from 'react';

import styles from './wrapper.scss';

export default class Wrapper extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.default}>
        {children}
      </div>
    );
  }
}
