// @flow

import React, { Component } from 'react';
import storage from 'electron-json-storage';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import type { history as historyType } from 'history';
import type { Map as MapType } from 'immutable';
import { withRouter } from 'react-router';
import wallpaper from 'wallpaper';
import { setPhoto } from 'app/containers/Main/redux';
import Navbar from 'app/components/Navbar';
import PhotoItem from './components/PhotoItem';
import StyledHistory from './style';

type Props = {
  history : historyType,
  setPhotoAction : () => void
};

type State = {
  pictures : Array,
  currentWallpaper : string,
};

@connect(
  null,
  { setPhotoAction: setPhoto },
)
@withRouter
@autobind
class Main extends Component<Props, State> {
  constructor(props : Props) {
    super(props);
    this.state = {
      pictures: [],
      currentWallpaper: '',
    };
  }

  componentDidMount() {
    this.getLocalPhotos();
    wallpaper.get()
      .then((path) => {
        this.setState({ currentWallpaper: path });
      });
  }

  getLocalPhotos() {
    storage.get('pictures', (error, pictures) => {
      if (pictures.list) {
        this.setState({ pictures: pictures.list });
      }
    });
  }

  handleSetActivePhoto(photoData : MapType) {
    const { setPhotoAction, history } = this.props;
    setPhotoAction(photoData);
    history.push('/');
  }

  render() {
    const { pictures, currentWallpaper } = this.state;
    return (
      <StyledHistory>
        <Navbar />
        <div className="container">
          {
            (pictures.length > 0)
              ? (
                <div className="pictures-wrapper">
                  {
                    pictures.map(picItem => (
                      <PhotoItem
                        key={picItem.id}
                        imageSRC={picItem.urls.small}
                        onClick={() => this.handleSetActivePhoto(picItem)}
                        active={currentWallpaper === picItem.path}
                      />
                    ))
                  }
                </div>
              )
              : <p className="empty-history">You haven’t set any wallpaper yet</p>
          }
        </div>
      </StyledHistory>
    );
  }
}

export default Main;
