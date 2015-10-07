import React, { Component } from 'react';

import styles from './select.scss';

export default class Select extends Component {
  render() {
    const { choices } = this.props;

    let values = Object.keys(choices);

    return (
      <select className={styles.default}>
        {values.map((value) => {
          let choice = choices[value];
          return (
            <option value={value}>
              {choice}
            </option>
          );
        })}
      </select>
    );
  }
}
