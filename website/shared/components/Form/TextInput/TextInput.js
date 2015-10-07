import React, { Component } from 'react';

import styles from './textinput.scss';

export default class TextInput extends Component {
  constructor(props) {
    super(props);

    this.props.type = this.props.type || 'text';
  }

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
