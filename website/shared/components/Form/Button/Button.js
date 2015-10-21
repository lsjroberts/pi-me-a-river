import React, { Component, PropTypes } from 'react';

import styles from './button.scss';

export default class Button extends Component {
  static propTypes = {
    style: PropTypes.string
  };

  static defaultProps = {
    style: 'default'
  };

  render() {
    const { style, children } = this.props;

    return (
      <button className={styles[style]}>
        {children}
      </button>
    );
  }
}
