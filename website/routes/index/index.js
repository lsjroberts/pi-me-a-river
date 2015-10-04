import React, { Component, PropTypes } from 'react';

import { SiteHeader } from '../../components/SiteHeader';
import { Search } from '../../containers/Search';

export default class Index extends Component {
  render() {
    return (
      <section>
        <SiteHeader />
        <Search style="large" />
      </section>
    );
  }
}
