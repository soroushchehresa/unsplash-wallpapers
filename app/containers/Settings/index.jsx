// @flow

import React, { Fragment, memo, useState, useEffect } from 'react';
import type { SyntheticEvent } from 'react';
import { remote } from 'electron';
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

const Settings = memo(({
  updateWallpaperSchedule,
  activeTheme,
  isChangeAutomaticActiveTheme,
  setActiveThemeAction,
  setAutomaticChangeActiveThemeAction,
  setUpdateWallpaperScheduleAction,
  setUpdateWallpaperTimeAction,
} : Props) => {
  const [isRunAtStartup, setIsRunAtStartup] = useState(false);
  const updateMethods = ['Daily', 'Weekly', 'Manually'];
  useEffect(() => {
    storage.get('isRunAtStartup', (error, status) => {
      setIsRunAtStartup(status);
    });
  }, []);

  const handleQuit = () => {
    remote.getCurrentWindow()
      .close();
  };

  const handleRunInStartup = ({ target: { checked } }) => {
    setIsRunAtStartup(checked);
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

  const handleChangeUpdateWallpaperScadule = (e : SyntheticEvent<HTMLButtonElement>) => {
    setUpdateWallpaperScheduleAction(e.target.value);
    setUpdateWallpaperTimeAction(moment()
      .format('MM/DD/YYYY HH:mm:ss'));
  };

  const handleChangeTheme = (e : SyntheticEvent<HTMLInputElement>) => {
    setActiveThemeAction(e.target.value);
  };

  const handleSetAutoChangeTheme = (e : SyntheticEvent<HTMLInputElement>) => {
    setAutomaticChangeActiveThemeAction(e.target.checked);
  };

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
          onChange={handleRunInStartup}
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
          onChange={handleChangeUpdateWallpaperScadule}
          defaultValue={updateWallpaperSchedule}
        >
          {
            updateMethods.map((updateMethod : string) => (
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
                <span>Change auto by OS</span>
                <input
                  className="changeAutoSetTheme"
                  type="checkbox"
                  onChange={handleSetAutoChangeTheme}
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
                  onChange={handleChangeTheme}
                  value="Light"
                  checked={activeTheme === 'Light'}
                />
              </label>
              <label htmlFor="dark">
                Dark
                <input
                  id="dark"
                  type="radio"
                  onChange={handleChangeTheme}
                  value="Dark"
                  checked={activeTheme === 'Dark'}
                />
              </label>
            </Fragment>
          )
        }
      </div>
      <button onClick={handleQuit} className="quit">
        Quit Unsplash Wallpapers
      </button>
      <a className="author" href="https://github.com/soroushchehresa/unsplash-wallpapers">
        Made with love by Soroush Chehresa on GitHub <br /> v{appPackage.version}
      </a>
    </StyledSettings>
  );
});

export default connect(
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
)(Settings);
