import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';

type Props = {};

type State = {
  address: string,
};

export default class ConnectionSettings extends Component<Props, State> {

  props: Props;

  state: State = {
    address: 'http://localhost:8080',
  };

  onAddressChange = async event => {
    this.setState({ address: event.target.value });
    event.preventDefault();
  };

  render() {
    const { address } = this.state;

    return (
      <form>
        <div className="form-group">
          <label for="connectionSettingsAddress">
            Node's REST address and port number:
          </label>
          <input
            className="form-control"
            name="address"
            type="text"
            id="connectionSettingsAddress"
            value={address}
            placeholder="Rest Address"
            aria-describedby="addressHelpInline"
            onChange={this.onAddressChange}
          />
          <small id="addressHelpInline" className="form-text text-muted">
            Set the address of the REST public interface. See the node configuration value for <code>rest.listen</code>. For example <code>http://localhost:8080</code>.
          </small>
        </div>

        <Link className="btn btn-primary" to={{ pathname: routes.NODE, state: this.state }}>Connect</Link>
      </form>
    );
  }
}
