import React, { PropTypes, Component } from 'react';

import SearchInput from './SearchInput';
import SearchItem from './SearchItem';

import '../styles/components/search.scss';


export default class Search extends Component {
  render() {
    const { rivers, actions } = this.props;

    return (
      <section className="search">
        <SearchInput {...actions} />
        <ul className="search-item-list">
          {rivers.map(river =>
            <SearchItem river={river} {...actions} />
          )}
        </ul>
      </section>
    );
  }
}
