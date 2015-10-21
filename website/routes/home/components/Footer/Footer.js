import React, { Component } from 'react';

import { P, A } from '../../../../shared/components/Typography';
import { Nav } from '../../../../shared/components/Layout';

import styles from './footer.scss';

export default class Footer extends Component {
  render() {
    const { children } = this.props;

    return (
      <footer>
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
