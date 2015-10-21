import React, { PropTypes, Component } from 'react';

import styles from './styles.scss';
// import '../../styles/components/header.scss';

export default class Header extends Component {
  render() {
    return (
      <header className={styles.header}>
        <h1>Pi Me A River</h1>
        <p>A look into the data and relationships of the world's rivers</p>
      </header>
    );
  }
}
