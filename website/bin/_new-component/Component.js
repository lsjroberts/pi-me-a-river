import React, { Component } from 'react';

import styles from './{{component}}.scss';

export default class {{Component}} extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.default}>
        {children}
      </div>
    );
  }
}
