import React, { Component } from 'react';

import styles from './heading.scss';

export default class Heading extends Component {
  render() {
    const { level, children } = this.props;

    let Tag = React.DOM['h' + level];

    return (
      <Tag className={styles.heading}>{children}</Tag>
    );
  }
}
