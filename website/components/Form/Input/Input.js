import React, { Component } from 'react';

import styles from './input.scss';

export default class Input extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.default}>
        {children}
      </div>
    );
  }
}
