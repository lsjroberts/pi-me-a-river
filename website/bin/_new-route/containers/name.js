import React, { Component } from 'react';

import { {{Name}} as {{Name}}Component } from '../components/{{name}}';

export default class {{Name}} extends Component {
  render() {
    const { children } = this.props;

    return (
      <{{Name}}Component>
        {children}
      </{{Name}}Component>
    );
  }
}
