import React, { Component } from 'react';

import styles from './button.scss';

export default class Button extends Component {
  constructor(props) {
    super(props);

    this.props.style = this.props.style || 'default';
  }

  render() {
    const { style, children } = this.props;

    return (
      <button className={styles[style]}>
        {children}
      </button>
    );
  }
}
