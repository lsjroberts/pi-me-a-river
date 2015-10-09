import React, { Component } from 'react';

import {
  H1
} from '../../../../shared/components/Typography';
import {
  Form,
  FormGroup,
  Label,
  TextInput,
  Checkbox,
  RadioList,
  Select,
  Button
} from '../../../../shared/components/Form';
import {
  Content
} from '../../../../shared/components/Layout';

export default class FormStyleguide extends Component {
  render() {
    return (
      <Content>
        <Form>
          <H1>Forms</H1>

          <FormGroup>
            <Label>Text Input</Label>
            <TextInput placeholder="placeholder" />
          </FormGroup>

          <FormGroup>
            <Label>Password Input</Label>
            <TextInput value="password" />
          </FormGroup>

          <FormGroup layout="inline">
            <Label>Inline Input</Label>
            <TextInput />
          </FormGroup>

          <FormGroup layout="inline">
            <Label>Checkbox</Label>
            <Checkbox />
          </FormGroup>

          <FormGroup layout="inline">
            <Label>Radio</Label>
            <RadioList choices={{"foo": "Foo", "bar": "Bar", "baz": "Baz"}} />
          </FormGroup>

          <FormGroup layout="inline">
            <Label>Select</Label>
            <Select choices={{"foo": "Foo", "bar": "Bar", "baz": "Baz"}} />
          </FormGroup>

          <FormGroup>
            <Button>Default Button</Button>
            <Button style="clear">Clear Button</Button>
            <Button style="warning">Warning Button</Button>
          </FormGroup>
        </Form>
      </Content>
    );
  }
}
