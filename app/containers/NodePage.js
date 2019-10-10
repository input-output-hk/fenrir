// @flow
import React, { Component } from 'react';
import Node from '../components/Node';

type Props = { location: Object };

export default class NodePage extends Component<Props> {
  props: Props;

  render() {
    let nodeAddress = '';
    if (this.props.location.state === undefined) {
      // TODO change location
      console.error('no location settings, redirect to the main page');
    } else {
      nodeAddress = this.props.location.state.address;
    }

    return <Node nodeAddress={nodeAddress} />
  }
}
