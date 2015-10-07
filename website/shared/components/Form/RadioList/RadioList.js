import React, { Component } from 'react';

import { Label, Radio } from '../';
import styles from './radiolist.scss';

export default class RadioList extends Component {
  render() {
    const { choices } = this.props;

    let values = Object.keys(choices);

    return (
      <div className={styles.default}>
        {values.map((value) => {
          let choice = choices[value];
          return (
            <Label>
              {choice}
              <Radio value={value} />
            </Label>
          );
        })}
      </div>
    );
  }
}
