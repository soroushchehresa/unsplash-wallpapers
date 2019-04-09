// @flow

import React, { PureComponent, Fragment } from 'react';
import type { SyntheticEvent } from 'react';
import { remote } from 'electron';
import { autobind } from 'core-decorators';
import { connect } from 'react-redux';
import type { Map as MapType } from 'immutable';
import storage from 'electron-json-storage';
import moment from 'moment';
import AutoLaunch from 'auto-launch';
import appPackage from '../../../package';
import StyledSettings from './style';
import {
  setUpdateWallpaperSchedule,
  setUpdateWallpaperTime,
  setActiveTheme,
  setAutomaticChangeActiveTheme,
} from './redux';

type Props = {
  setUpdateWallpaperScheduleAction : (data : string) => void,
  setUpdateWallpaperTimeAction : (data : string) => void,
  setActiveThemeAction : (data : string) => void,
  setAutomaticChangeActiveThemeAction : (data : boolean) => void,
  updateWallpaperSchedule : MapType,
  activeTheme : string,
  isChangeAutomaticActiveTheme : boolean,
};

type State = {
  isRunAtStartup : boolean,
};

@connect(
  state => ({
    updateWallpaperSchedule: state.getIn(['Settings', 'updateWallpaperSchedule']),
    activeTheme: state.getIn(['Settings', 'activeTheme']),
    isChangeAutomaticActiveTheme: state.getIn(['Settings', 'isChangeAutomaticActiveTheme']),
  }),
  {
    setUpdateWallpaperScheduleAction: setUpdateWallpaperSchedule,
    setUpdateWallpaperTimeAction: setUpdateWallpaperTime,
    setActiveThemeAction: setActiveTheme,
    setAutomaticChangeActiveThemeAction: setAutomaticChangeActiveTheme,
  },
)
@autobind
class Settings extends PureComponent<Props, State> {
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
    setUpdateWallpaperTimeAction(moment()
      .format('DD.MM.YYYY HH:mm'));
  }

  handleChangeTheme(e : SyntheticEvent<HTMLInputElement>) {
    const { setActiveThemeAction } = this.props;
    setActiveThemeAction(e.target.value);
  }

  handleSetAutoChangeTheme(e : SyntheticEvent<HTMLInputElement>) {
    const { setAutomaticChangeActiveThemeAction } = this.props;
    setAutomaticChangeActiveThemeAction(e.target.checked);
  }

  render() {
    const { updateWallpaperSchedule, activeTheme, isChangeAutomaticActiveTheme } = this.props;
    const { isRunAtStartup } = this.state;
    return (
      <StyledSettings>
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
        <div className="choose-theme">
          <p>
            Theme:
            {
              (process.platform === 'darwin')
              && (
                <Fragment>
                  <span>change auto by OS</span>
                  <input
                    className="changeAutoSetTheme"
                    type="checkbox"
                    onChange={this.handleSetAutoChangeTheme}
                    checked={isChangeAutomaticActiveTheme}
                  />
                </Fragment>
              )
            }
          </p>
          {
            !isChangeAutomaticActiveTheme
            && (
              <Fragment>
                <label htmlFor="light">
                  Light
                  <input
                    id="light"
                    type="radio"
                    onChange={this.handleChangeTheme}
                    value="Light"
                    checked={activeTheme === 'Light'}
                  />
                </label>
                <label htmlFor="dark">
                  Dark
                  <input
                    id="dark"
                    type="radio"
                    onChange={this.handleChangeTheme}
                    value="Dark"
                    checked={activeTheme === 'Dark'}
                  />
                </label>
              </Fragment>
            )
          }
        </div>
        <button onClick={Settings.handleQuit} className="quit">
          Quit Unsplash Wallpapers
        </button>
        <p className="version">
          version:
          {appPackage.version}
        </p>
      </StyledSettings>
    );
  }
}

export default Settings;
