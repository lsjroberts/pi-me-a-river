import React, { PropTypes, Component } from 'react';

import * as views from '../constants/Views';

export default class SearchItem extends Component {
  handleClick(id) {
    if (!id) return;

    this.props.findRiver(id);
    this.props.changeView(views.RIVER, { id });
  }

  render() {
    const { river } = this.props;

    return (
      <article className="search-item">
        <a href='#'
           onClick={() => this.handleClick(river.id)}>
            { river.name }
        </a>
      </article>
    );
  }
}
