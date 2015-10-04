import React, { Component } from 'react';

import styles from './content.scss';

export default class Content extends Component {
  render() {
    const { children } = this.props;

    return (
      <section className={styles.default}>
        {children}
      </section>
    );
  }
}
