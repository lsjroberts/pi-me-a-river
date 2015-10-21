import React, { Component } from 'react';

import styles from './label.scss';

export default class Label extends Component {
  render() {
    const { children } = this.props;

    return (
      <label className={styles.default}>
        {children}
      </label>
    );
  }
}
