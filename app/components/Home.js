// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import ConnectionSettings from './ConnectionSettings';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="display-1">Connect Fenrir to Jörmungandr</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <ConnectionSettings />
          </div>
        </div>
      </div>
    );
  }
}
