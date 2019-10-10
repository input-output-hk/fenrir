// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Node.css';
import ChangeSettingsButton from './ChangeSettingsButton';
import routes from '../constants/routes';
import MissingSettingsAlert from './MissingSettingsAlert';
import BlockchainConfig from './Node/BlockchainConfig';
import NodeStats from './Node/Stats';
import FragmentLogs from './Node/FragmentLogs';
import LeaderSchedules from './Node/LeaderSchedules';
import StakePie from './Node/StakePie';

type Props = {
  nodeAddress: string
};

export default class Node extends Component<Props> {
  props: Props;

  render() {
    const { nodeAddress } = this.props;

    let content = null;
    if (nodeAddress === '') {
      content = (
        <div className="row">
          <div className="col">
            <MissingSettingsAlert />
          </div>
        </div>
      );
    } else {
      content = (
        <div>
          <div className="row">
            <div className="col-6">
              <BlockchainConfig nodeAddress={nodeAddress} />
            </div>
            <div className="col-6">
              <NodeStats nodeAddress={nodeAddress} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <FragmentLogs nodeAddress={nodeAddress} />
            </div>
          </div>
          <div className="row">
            <div className="col-8">
              <LeaderSchedules nodeAddress={nodeAddress} />
            </div>
            <div className="col-4">
              <StakePie nodeAddress={nodeAddress} />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col" >
            <span className="display-3">
              Jörmungandr
            </span>
            <span className="float-left">
              <ChangeSettingsButton />
            </span>
          </div>
        </div>
        {content}
      </div>
    );
  }
}
