import React, { Component } from 'react';

import { Wrapper } from '../../../../shared/components/Layout';
import {
  Form,
  FormGroup,
  Label,
  TextInput,
  Button
} from '../../../../shared/components/Form';

// import styles from './search.scss';

export default class Search extends Component {
  render() {
    const { term } = this.props;

    console.log(this.props);

    return (
      <Wrapper>
        <Form onSubmit={this.props.onSubmit}>
          <FormGroup>
            <TextInput
              placeholder="Search"
              value={term}
              onChange={this.props.onChange}
            />
          </FormGroup>
        </Form>
      </Wrapper>
    );
  }
}
