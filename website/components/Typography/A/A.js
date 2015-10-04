import React, { Component } from 'react';

import styles from './a.scss';

export default class A extends Component {
  render() {
    const { children, href } = this.props;

    return (
      <a
        className={styles.default}
        href={href}
      >
        {children}
      </a>
    );
  }
}
