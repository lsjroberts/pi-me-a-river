import React, { Component } from 'react';

import { ListItem } from '../ListItem';

import styles from './list.scss';

export default class List extends Component {
  render() {
    const { children } = this.props;

    let style = (this.props.style && styles[this.props.style])
      ? this.props.style
      : 'default';

    let Tag = (style === 'numbered')
      ? React.DOM.ol
      : React.DOM.ul;

    return (
      <ul className={styles[style]}>
        {children.map(child => {
          return (
            <ListItem>{child}</ListItem>
          );
        })}
      </ul>
    );
  }
}
