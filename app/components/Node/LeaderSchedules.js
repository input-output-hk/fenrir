// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactToolTip from 'react-tooltip';
import Loading from '../Loading';
import ReactTable from 'react-table';

type Props = {
  nodeAddress: string
};

type Schedule = {
  createdAtTime: Date,
  enclaveLeaderId: number,
  finishedAtTime: Date,
  scheduledAtTime: Date,
  scheduledAtDate: string,
  wakeAtTime: Date,
};

type State = {
  loaded: boolean,
  schedules: [Schedule],
};

const columns = [
  {
    id: 'scheduledAtTime',
    Header: 'Schedule',
    accessor: schedule => { return { time: schedule.scheduledAtTime, date: schedule.scheduledAtDate }; },
    Cell: props => {
      return (
        <p>
          {props.value.time.toLocaleString()}
          (<strong>{props.value.date}</strong>)
        </p>
      );
    }
  },
  {
    id: 'startTime',
    Header: 'Started at',
    accessor: schedule => schedule.wakeAtTime,
    Cell: props => {
      if (props.value === null) {
        return "TBD";
      } else {
        return props.value.toLocaleString();
      }
    }
  },
  {
    id: 'finishedTime',
    Header: 'Finished at',
    accessor: schedule => schedule.finishedAtTime,
    Cell: props => {
      if (props.value === null) {
        return "TBD";
      } else {
        return props.value.toLocaleString();
      }
    }
  }
];

const defaultSortMethod = (schedule1: Schedule, schedule2: Schedule)  => {
  if (schedule1.scheduledAtTime < schedule2.scheduledAtTime) {
    return -1;
  } else if (schedule1.scheduledAtTime > schedule2.scheduledAtTime) {
    return +1;
  } else {
    return 0;
  }
};

export default class LeaderSchedules extends Component<Props, State> {
  props: Props;

  state: State = {
    loaded: false,
    schedules: [],
  };

  loadSchedules = () => {
    const Http = new XMLHttpRequest();
    const url = this.props.nodeAddress + '/api/v0/leaders/logs';
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
      if (Http.responseText.length === 0) {
        return;
      }
      let schedules = JSON.parse(Http.responseText);

      schedules = schedules.map((schedule) => {
        let finishedAtTime = null;
        if (schedule.finished_at_time !== null) {
          finishedAtTime = new Date(schedule.finished_at_time);
        }

        let wakeAtTime = null;
        if (schedule.wake_at_time !== null) {
          wakeAtTime = new Date(schedule.finished_at_time);
        }

        return {
          createdAtTime: new Date(schedule.created_at_time),
          enclaveLeaderId: schedule.enclave_leader_id,
          finishedAtTime: finishedAtTime,
          scheduledAtTime: new Date(schedule.scheduled_at_time),
          scheduledAtDate: schedule.scheduled_at_date,
          wakeAtTime: wakeAtTime,
        };
      });

      this.setState({ loaded: true, schedules: schedules });
    }
  }

  componentDidMount() {
    if (this.state.loaded === false) {
      this.loadSchedules();
    }
  }

  render() {
    const { loaded, schedules } = this.state;
    let arraySchedules = schedules;

    if (loaded === false) {

      return (
        <div>
          Loading the fragment logs...
          <Loading />
        </div>
      );
    } else {
      arraySchedules.sort(defaultSortMethod);
      arraySchedules.reverse();

      return (
        <div className="card bg-dark">
          <div className="card-header">
            <span className="badge badge-light">{schedules.length}</span>
            &nbsp;Leader Schedules
            <span className="float-right">
              <button className="btn btn-primary" data-tip="Check for more logs" onClick={this.loadSchedules}>
                <i className="fa fa-redo" />
                <ReactToolTip />
              </button>
            </span>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col">
                <ReactTable
                  defaultPageSize={5}
                  data={arraySchedules}
                  columns={columns}
                />
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

