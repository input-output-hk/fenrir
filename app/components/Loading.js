// @flow
import React, { Component } from 'react';

type Props = {};

export default class Loading extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>

    );
  }
}

