// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactToolTip from 'react-tooltip';
import Loading from '../Loading';

type Props = {
  nodeAddress: string
};

type Stats = {
  uptime: number,
  numberTransactionReceived: number,
  numberBlockReceived: number,
  lastBlockHash: string,
  lastBlockDate: String,
  lastBlockChainLength: string,
  lastBlockTime: Date,
  lastBlockNumberOfTransactions: number,
  lastBlockTotalOutput: number,
  lastBlockFees: number
};

type State = {
  loaded: boolean,
  stats?: Stats
};

function secondsToString(seconds)
{
  const years = Math.floor(seconds / 31536000);
  const days = Math.floor((seconds % 31536000) / 86400);
  const hours = Math.floor(((seconds % 31536000) % 86400) / 3600);
  const minutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
  const remainingSeconds = (((seconds % 31536000) % 86400) % 3600) % 60;

  let result = '';
  if (years !== 0) {
    result += years + " years ";
  }
  if (days !== 0) {
    result += days + " days ";
  }
  if (hours !== 0) {
    result += hours + " hours ";
  }
  if (minutes !== 0) {
    result += minutes + " minutes ";
  }
  if (remainingSeconds !== 0) {
    result += remainingSeconds + " seconds";
  }

  return result;
}


const renderData = (stats: Stats) => {
  const {
    uptime,
    numberTransactionReceived,
    numberBlockReceived,
    lastBlockHash,
    lastBlockDate,
    lastBlockChainLength,
    lastBlockTime,
    lastBlockNumberOfTransactions,
    lastBlockTotalOutput,
    lastBlockFees,
  } = stats;

  return (
    <div className="card bg-dark">
      <div className="card-header">
        Node stats
      </div>
      <div className="card-body">
        <div className="row">
          <label className="col-sm-4">Up since</label>
          <div className="col-sm-8">
            {secondsToString(uptime)}
          </div>
        </div>

        <div className="row">
          <label className="col-sm-4">Received Txs</label>
          <div className="col-sm-8">
            {numberTransactionReceived}
          </div>
        </div>

        <div className="row">
          <label className="col-sm-4">Received Blocks</label>
          <div className="col-sm-8">
            {numberBlockReceived}
          </div>
        </div>

        <div className="row">
          <label className="col-sm-4">Last Block</label>
          <div className="col-sm-8">
            <div className="blockHash" data-tip={lastBlockHash}>
              {lastBlockHash}
              <ReactToolTip />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-1"></div>
          <label className="col-sm-3">Date/Length</label>
          <div className="col-sm-8">
            {lastBlockDate} / {lastBlockChainLength}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2"></div>
          <label className="col-sm-2">Txs</label>
          <div className="col-sm-8">
            {lastBlockNumberOfTransactions}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2"></div>
          <label className="col-sm-2">Outputs</label>
          <div className="col-sm-8">
            {lastBlockTotalOutput}
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2"></div>
          <label className="col-sm-2">Fees</label>
          <div className="col-sm-8">
            {lastBlockFees}
          </div>
        </div>

      </div>
    </div>
  );
};

export default class NodeStats extends Component<Props, State> {
  props: Props;

  interval= null;

  state: State = {
    loaded: false,
    stats: {
      uptime: 0,
      numberTransactionReceived: 0,
    }
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    if (this.state.loaded === true) {
      return;
    }

    this.interval = setInterval(() => {
      const Http = new XMLHttpRequest();
      const url = this.props.nodeAddress + '/api/v0/node/stats';
      Http.open("GET", url);
      Http.send();

      Http.onreadystatechange = (e) => {
        if (Http.responseText.length === 0) {
          return;
        }
        const data = JSON.parse(Http.responseText);

        console.log(data);


        const stats = {
          uptime: data.uptime,
          numberTransactionReceived: data.txRecvCnt,
          numberBlockReceived: data.blockRecvCnt,
          lastBlockHash: data.lastBlockHash,
          lastBlockDate: data.lastBlockDate,
          lastBlockChainLength: data.lastBlockHeight,
          lastBlockTime: new Date(data.lastBlockTime),
          lastBlockNumberOfTransactions: data.lastBlockTx,
          lastBlockTotalOutput: data.lastBlockSum,
          lastBlockFees: data.lastBlockFees
        };

        this.setState({ loaded: true, stats: stats });
      }
    },
      1000);

  }

  render() {
    const { loaded, stats } = this.state;

    if (loaded === false) {

      return (
        <div>
          Loading node stats...
          <Loading />
        </div>
      );
    } else {
      return renderData(stats);
    }
  }
}

