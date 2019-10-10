// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactToolTip from 'react-tooltip';
import Loading from '../Loading';

type Props = {
  nodeAddress: string
};

type Blockchain = {
  block0Hash: string,
  block0Time: Object,
  consensus: string
};

type State = {
  loaded: boolean,
  blockchain?: Blockchain,
};

const renderData = (blockchain: Blockchain) => {
  return (
    <div className="card bg-dark">
      <div className="card-header">
        Blockchain settings
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-sm-3">Block0</div>
          <div className="col-sm-9" >
            <div className="blockHash" data-tip={blockchain.block0Hash}>
              {blockchain.block0Hash}
              <ReactToolTip />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3">Started</div>
          <div className="col-sm-9">
            {blockchain.block0Time.toLocaleString()}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-3">Consensus</div>
          <div className="col-sm-9">
            {blockchain.consensus}
          </div>
        </div>
      </div>
    </div>
  );
};

export default class BlockchainConfig extends Component<Props, State> {
  props: Props;

  state: State = {
    loaded: false,
    blockchain: {
      block0Hash: 'N/A',
      block0Time: new Date(),
      consensus: 'N/A'
    },
  };

  componentDidMount() {
    if (this.state.loaded === true) {
      return;
    }

    const Http = new XMLHttpRequest();
    const url = this.props.nodeAddress + '/api/v0/settings';
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
      if (Http.responseText.length === 0) {
        return;
      }
      let data = JSON.parse(Http.responseText);

      const blockchain = {
        block0Hash: data.block0Hash,
        block0Time: new Date(data.block0Time),
        consensus: data.consensusVersion,
      };

      this.setState({ loaded: true, blockchain: blockchain });
    }
  }

  render() {
    const { loaded, blockchain } = this.state;

    if (loaded === false) {

      return (
        <div>
          Loading the blockchain settings...
          <Loading />
        </div>
      );
    } else {
      return renderData(blockchain);
    }
  }
}
