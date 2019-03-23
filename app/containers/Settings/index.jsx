// @flow

import React, { Component } from 'react';
import type { SyntheticEvent } from 'react';
import { remote } from 'electron';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import type { Map as MapType } from 'immutable';
import storage from 'electron-json-storage';
import Navbar from 'app/components/Navbar';
import AutoLaunch from 'auto-launch';
import appPackage from '../../../package';
import StyledSettings from './style';
import { setUpdateSchedule } from './redux';

type Props = {
  setUpdateScheduleAction : (
    data : {
      pattern : string,
      method : string,
    },
  ) => void,
  updateScheduleMethod : MapType,
};

type State = {
  isRunAtStartup : boolean,
};

@connect(
  state => ({
    updateScheduleMethod: state.getIn(['Settings', 'updateScheduleMethod']),
  }),
  { setUpdateScheduleAction: setUpdateSchedule },
)
@autobind
class Settings extends Component<Props, State> {
  static handleQuit() {
    remote.getCurrentWindow()
      .close();
  }

  constructor(props) {
    super(props);
    this.state = {
      isRunAtStartup: false,
    };
    this.updateMethods = ['Daily', 'Weekly', 'Manually'];
  }

  componentDidMount() {
    storage.get('isRunAtStartup', (error, status) => {
      this.setState({
        isRunAtStartup: status,
      });
    });
  }

  handleRunInStartup = ({ target: { checked } }) => {
    this.setState({
      isRunAtStartup: checked,
    });
    storage.set('isRunAtStartup', checked);
    const minecraftAutoLauncher = new AutoLaunch({
      name: 'Unsplash Wallpapers',
      path: '/Applications/Unsplash Wallpapers.app', // eslint-disable-line
    });
    if (checked) {
      minecraftAutoLauncher.enable();
    } else {
      minecraftAutoLauncher.disable();
    }
  };

  handleChangeUpdateScadule(e : SyntheticEvent<HTMLButtonElement>) {
    const { setUpdateScheduleAction } = this.props;
    setUpdateScheduleAction({ method: e.target.value, pattern: '' });
  }

  render() {
    const { updateScheduleMethod } = this.props;
    const { isRunAtStartup } = this.state;
    return (
      <StyledSettings>
        <Navbar />
        <div className="container">
          <h3>Settings</h3>
          <label
            className="run-at-startup"
            htmlFor="run-at-startup"
          >
            Run at startup
            <input
              id="run-at-startup"
              type="checkbox"
              onChange={this.handleRunInStartup}
              checked={isRunAtStartup}
            />
          </label>
          {/* eslint-disable-next-line */}
          <label
            className="auto-update"
            htmlFor="update-method"
          >
            Update
            <select
              id="update-method"
              onChange={this.handleChangeUpdateScadule}
              defaultValue={updateScheduleMethod}
            >
              {
                this.updateMethods.map((updateMethod : string) => (
                  <option key={updateMethod} value={updateMethod}>
                    {updateMethod}
                  </option>
                ))
              }
            </select>
          </label>
          <button onClick={Settings.handleQuit} className="quit">
            Quit Unsplash Wallpapers
          </button>
          <p className="version">
            verion:
            {appPackage.version}
          </p>
        </div>
      </StyledSettings>
    );
  }
}

export default Settings;
