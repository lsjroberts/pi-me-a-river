import React, { Component } from 'react';

import { Content } from '../../../shared/layout';
import {
  Form,
  FormGroup,
  Label,
  TextInput,
  Button
} from '../../../shared/form';

import styles from './search.scss';

export default class Search extends Component {
  constructor(props) {
    super(props);
  }

  handleChange(e) {

  }

  render() {
    const { term } = this.props;

    return (
      <section className={styles.default}>
        <Content>
          <Form>
            <TextInput
              placeholder="Search"
              value={term}
              onChange={e => this.handleChange(e)}
            />
          </Form>
        </Content>
      </section>
    );
  }
}
