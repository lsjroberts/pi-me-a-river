import React, { Component, PropTypes } from 'react';

import { TypographyStyleguide, FormStyleguide } from '../components';

export default class Styleguide extends Component {
  render () {
    return (
      <div>
        <TypographyStyleguide />
        <FormStyleguide />
      </div>
    );
  }
}
