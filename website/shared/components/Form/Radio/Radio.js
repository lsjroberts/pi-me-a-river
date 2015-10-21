import React, { Component } from 'react';

import styles from './radio.scss';

export default class Radio extends Component {
  render() {
    const { children } = this.props;

    return (
      <input
        className={styles.default}
        type='radio'
      />
    );
  }
}
