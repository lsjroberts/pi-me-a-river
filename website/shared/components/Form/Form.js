import React, { Component } from 'react';

import styles from './form.scss';

export default class Form extends Component {
  render() {
    const { children } = this.props;

    return (
      <form className={styles.default}>
        {children}
      </form>
    );
  }
}
