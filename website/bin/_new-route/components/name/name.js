import React, { Component } from 'react';

import styles from './{{name}}.scss';

export default class {{Name}} extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.default}>
        {children}
      </div>
    );
  }
}
