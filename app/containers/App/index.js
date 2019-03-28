// @flow

import React, { Component } from 'react';
import { autobind } from 'core-decorators';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getPhoto } from 'app/containers/Home/redux';

type Props = {
  children : React.Node,
  updateWallpaperSchedule : string,
  updateWallpaperDate : string,
  getPhotoAction : (data : { data : boolean }) => void,
};

@withRouter
@connect(
  state => ({
    updateWallpaperSchedule: state.getIn(['Settings', 'updateWallpaperSchedule']),
    updateWallpaperDate: state.getIn(['Settings', 'updateWallpaperDate']),
  }),
  {
    getPhotoAction: getPhoto,
  },
)
@autobind
class App extends Component<Props> {
  componentDidMount() : void {
    const checkUpdateTime = () => {
      const {
        updateWallpaperSchedule,
        updateWallpaperDate,
        getPhotoAction,
      } = this.props;
      switch (updateWallpaperSchedule) {
        case 'Daily':
          if ((moment.duration(updateWallpaperDate)).asHours() >= 24) {
            getPhotoAction({ setAutomaticWallpaper: true });
          }
          break;
        case 'Weekly':
          if ((moment.duration(updateWallpaperDate)).asHours() >= 168) {
            getPhotoAction({ setAutomaticWallpaper: true });
          }
          break;
        default:
          break;
      }
    };
    checkUpdateTime();
    setInterval(checkUpdateTime, 10000);
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default App;
