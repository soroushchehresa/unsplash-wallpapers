// @flow

import React, { Component } from 'react';
import type { SyntheticEvent } from 'react';
import { remote } from 'electron';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import type { Map as MapType } from 'immutable';
import storage from 'electron-json-storage';
import moment from 'moment';
import Navbar from 'app/components/Navbar';
import AutoLaunch from 'auto-launch';
import appPackage from '../../../package';
import StyledSettings from './style';
import { setUpdateWallpaperSchedule, setUpdateWallpaperTime } from './redux';

type Props = {
  setUpdateWallpaperScheduleAction : (data : string) => void,
  setUpdateWallpaperTimeAction : (data : string) => void,
  updateWallpaperSchedule : MapType,
};

type State = {
  isRunAtStartup : boolean,
};

@connect(
  state => ({
    updateWallpaperSchedule: state.getIn(['Settings', 'updateWallpaperSchedule']),
  }),
  {
    setUpdateWallpaperScheduleAction: setUpdateWallpaperSchedule,
    setUpdateWallpaperTimeAction: setUpdateWallpaperTime,
  },
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

  handleChangeUpdateWallpaperScadule(e : SyntheticEvent<HTMLButtonElement>) {
    const { setUpdateWallpaperScheduleAction, setUpdateWallpaperTimeAction } = this.props;
    setUpdateWallpaperScheduleAction(e.target.value);
    setUpdateWallpaperTimeAction(moment().format('DD.MM.YYYY HH:mm'));
  }

  render() {
    const { updateWallpaperSchedule } = this.props;
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
              onChange={this.handleChangeUpdateWallpaperScadule}
              defaultValue={updateWallpaperSchedule}
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
