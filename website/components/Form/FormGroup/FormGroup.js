import React, { Component } from 'react';

import styles from './formgroup.scss';

export default class FormGroup extends Component {
  render() {
    const { children } = this.props;

    let layout = (this.props.layout === 'inline') ? 'inline' : 'block';

    return (
      <div className={styles[layout]}>
        {children}
      </div>
    );
  }
}
