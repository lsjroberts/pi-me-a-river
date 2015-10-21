import React, { Component, PropTypes } from 'react';

import styles from './textInput.scss';

export default class TextInput extends Component {
  static propTypes = {
    type: PropTypes.string
  };

  static defaultProps = {
    type: 'text'
  };

  render() {
    const { type, value, placeholder } = this.props;

    return (
      <input
        className={styles.default}
        type={type}
        value={value}
        placeholder={placeholder}
      />
    );
  }
}
