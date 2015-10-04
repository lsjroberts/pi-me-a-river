import React, { Component } from 'react';

import { Nav } from '../Layout';
import { P, A } from '../Typography';

import styles from './sitefooter.scss';

export default class SiteFooter extends Component {
  render() {
    const { children } = this.props;

    return (
      <footer className={styles.default}>
        <Nav>
          <A href="/docs">API Documentation</A>
          <A href="#">Data &amp; Resources</A>
          <A href="#">About</A>
        </Nav>
        <P>
          Created by <A href="https://twitter.com/gelatindesign">gelatindesign</A>
        </P>
        <P>
          Source available on <A href="https://github.com/lsjroberts/pi-me-a-river">github</A>
        </P>
      </footer>
    );
  }
}
