import React, { PropTypes, Component } from 'react';

import SearchInput from './SearchInput';
import SearchItem from './SearchItem';


export default class Search extends Component {
  render() {
    const { rivers, actions } = this.props;

    return (
      <section className="search">
        <SearchInput {...actions} />
        <ul className="search-items">
          {rivers.map(river =>
            <SearchItem river={river} {...actions} />
          )}
        </ul>
      </section>
    );
  }
}
