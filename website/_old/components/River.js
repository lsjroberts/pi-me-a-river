import React, { PropTypes, Component } from 'react';

import '../styles/components/river.scss';

export default class River extends Component {
  render() {
    return (
      <article className="river">
        {this.renderHeading()}
      </article>
    );
  }

  renderHeading() {
    const { river } = this.props;

    if (river.nameEn) {
      return (
        <heading>
          <h1>{river.name}</h1>
          <p>{river.nameEn}</p>
        </heading>
      );
    } else {
      return (
        <heading>
          <h1>{river.name}</h1>
        </heading>
      );
    }
  }
}
