import React, { Component } from 'react';

import { Content } from '../../components/Layout';
import {
  Form,
  FormGroup,
  Label,
  TextInput,
  Button
} from '../../components/Form';

import styles from './searchform.scss';

export default class SearchForm extends Component {
  constructor(props) {
    super(props);

    this.props.style = (this.props.style && styles[this.props.style])
      ? this.props.style
      : 'default';
  }

  render() {
    const { children, style } = this.props;

    return (
      <section className={styles[style]}>
        <Content>
          <Form>
            <TextInput placeholder="Search" />
          </Form>
        </Content>
      </section>
    );
  }
}
