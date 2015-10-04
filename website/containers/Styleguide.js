import React, { Component, PropTypes } from 'react';

import {
  H1,
  H2,
  H3,
  P
} from '../components/Typography';

import {
  Form,
  FormGroup,
  Label,
  TextInput,
  Checkbox,
  RadioList,
  Select,
  Button
} from '../components/Form';

import { Content } from '../components/Layout';
import { SiteFooter } from '../components/SiteFooter';

export default class Styleguide extends Component {
  render () {
    return (
      <div>
        <Content>
          <H1>Styleguide</H1>
          <P>Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean lacinia bibendum nulla sed consectetur. Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Nullam id dolor id nibh ultricies vehicula ut id elit.</P>
          <P>Sed posuere consectetur est at lobortis. Vestibulum id ligula porta felis euismod semper. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean lacinia bibendum nulla sed consectetur. Nulla vitae elit libero, a pharetra augue.</P>

          <H2>Secondary Heading</H2>
          <P>Etiam porta sem malesuada magna mollis euismod. Etiam porta sem malesuada magna mollis euismod. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
          <P>Donec ullamcorper nulla non metus auctor fringilla. Donec sed odio dui. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Etiam porta sem malesuada magna mollis euismod.</P>

          <H3>Tertiary Heading</H3>
          <P>Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Sed posuere consectetur est at lobortis. Nulla vitae elit libero, a pharetra augue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nulla vitae elit libero, a pharetra augue.</P>
          <P>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vestibulum id ligula porta felis euismod semper. Etiam porta sem malesuada magna mollis euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</P>
        </Content>

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

        <SiteFooter />
      </div>
    );
  }
}
