import React, { PropTypes, Component } from 'react';

import '../styles/components/footer.scss';

export default class Header extends Component {
  render() {
    return (
      <footer className="site-footer">
        <nav>
          <ul>
            <li><a href="#">API Documentation</a></li>
            <li><a href="#">Data &amp; Resources</a></li>
            <li><a href="#">About</a></li>
          </ul>
        </nav>
        <p className="credits">
          Created by <a href="https://twitter.com/gelatindesign">gelatindesign</a>
        </p>
        <p className="credits">
          Source available on <a href="https://github.com/lsjroberts/pi-me-a-river">github</a>
        </p>
      </footer>
    );
  }
}
