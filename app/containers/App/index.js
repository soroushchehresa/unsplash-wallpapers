// @flow

import { debug } from 'electron-log';
import React, { Fragment, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { Route } from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Navbar from 'app/components/Navbar';
import { getPhoto } from 'app/containers/Home/redux';
import GlobalStyle from 'app/styles/globalStyles';

type Props = {
  children : React.Node,
  updateWallpaperSchedule : string,
  updateWallpaperDate : string,
  getPhotoAction : (data : { data : boolean }) => void,
  activeCategory : string,
  activeTheme : string,
  location : Object,
};

const App = ({
  children,
  activeTheme,
  location,
  updateWallpaperSchedule,
  updateWallpaperDate,
  getPhotoAction,
  activeCategory,
} : Props) => {
  useEffect(() => {
    const checkUpdateTime = () => {
      const now = moment();
      const last = moment(updateWallpaperDate);
      const diffTime = now.diff(last, 'hours');
      switch (updateWallpaperSchedule) {
        case 'Daily':
          if (diffTime >= 24) {
            getPhotoAction({ setAutomaticWallpaper: true, activeCategory });
          }
          break;
        case 'Weekly':
          if (diffTime >= 168) {
            getPhotoAction({ setAutomaticWallpaper: true, activeCategory });
          }
          break;
        default:
          break;
      }
    };
    checkUpdateTime();
    setInterval(checkUpdateTime, 10000);
  }, []);
  return (
    <ThemeProvider theme={{ mode: activeTheme }}>
      <Fragment>
        <Navbar location={location} />
        <div className="app-container">
          <Route
            render={() => (
              <TransitionGroup>
                <CSSTransition
                  key={location.pathname}
                  classNames="fade"
                  timeout={300}
                >
                  {children}
                </CSSTransition>
              </TransitionGroup>
            )}
          />
          <GlobalStyle />
        </div>
      </Fragment>
    </ThemeProvider>
  );
};

export default connect(
  state => ({
    updateWallpaperSchedule: state.getIn(['Settings', 'updateWallpaperSchedule']),
    updateWallpaperDate: state.getIn(['Settings', 'updateWallpaperDate']),
    activeCategory: state.getIn(['Categories', 'activeCategory']),
    activeTheme: state.getIn(['Settings', 'activeTheme']),
  }),
  {
    getPhotoAction: getPhoto,
  },
)(withRouter(App));
