import React, { Component } from 'react';

import styles from './listItem.scss';

export default class ListItem extends Component {
  render() {
    const { children } = this.props;

    return (
      <li className={styles.default}>
        {children}
      </li>
    );
  }
}
