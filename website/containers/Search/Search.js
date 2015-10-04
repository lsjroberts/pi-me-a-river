import React, { Component } from 'react';

import styles from './search.scss';

export default class Search extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className={styles.default}>
        {children}
      </div>
    );
  }
}
