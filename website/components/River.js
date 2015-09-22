import React, { PropTypes, Component } from 'react';

export default class River extends Component {
  render() {
    const { river } = this.props;

    return (
      <article className="river">
        <h1>{river.name}</h1>
      </article>
    );
  }
}
