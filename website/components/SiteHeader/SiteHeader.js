import React, { Component } from 'react';

import { Content } from '../Layout';
import { H1, P } from '../Typography';

import styles from './siteheader.scss';

export default class SiteHeader extends Component {
  render() {
    const { children } = this.props;

    return (
      <section className={styles.default}>
        <Content>
          <H1>Pi Me A River</H1>
          <P>A look into the data and relationships of the world's rivers</P>
        </Content>
      </section>
    );
  }
}
