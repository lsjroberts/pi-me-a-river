import React, { Component } from 'react';

import styles from './checkbox.scss';

export default class Checkbox extends Component {
  render() {
    const { children } = this.props;

    return (
      <input
        className={styles.default}
        type='checkbox'
      />
    );
  }
}
