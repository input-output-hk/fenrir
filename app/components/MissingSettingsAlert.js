// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import ReactToolTip from 'react-tooltip';

type Props = {};

export default class MissingSettingsAlert extends Component<Props> {
  props: Props;

  render() {
    return (
      <div class="alert alert-danger" role="alert">
        <h2 class="alert-heading">Missing settings!</h2>
        <p>Missing the node's REST insetting. Without them Fenrir will not be able to connect
        to Jörmungandr. Nothing will happen</p>
        <hr />
        <div class="row">
          <div class="col-6">
            Go to the HOME page and enter the necessary settings
          </div>
          <div className="col" />
          <div class="col">
            <Link to={routes.HOME} className="btn btn-danger" data-tip="Set the Node connection settings">
              Go to Home page
             <ReactToolTip />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
