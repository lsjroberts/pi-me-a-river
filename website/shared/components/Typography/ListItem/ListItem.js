import React, { Component } from 'react';

import styles from './listItem.scss';

export default class ListItem extends Component {
  render() {
    const { children } = this.props;

    let style = (this.props.style && styles[this.props.style])
      ? this.props.style
      : 'default';

    return (
      <li className={styles[style]}>
        {children}
      </li>
    );
  }
}
