// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { autobind } from 'core-decorators';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import os from 'os';
import storage from 'electron-json-storage';
import wallpaper from 'wallpaper';
import Navbar from 'app/components/Navbar';
import Loading from 'app/components/Loading';
import StyledMain from './style';
import { getPhoto } from './redux';

type Props = {
  getPhotoLoading: boolean,
  photoData: any,
  getPhoto: () => void
};

type State = {
  setWallpaperLoading: boolean,
  downloadLoading: boolean
};

@connect(
  state => ({
    getPhotoLoading: state.getIn(['Main', 'getPhotoLoading']),
    photoData: state.getIn(['Main', 'photoData'])
  }),
  { getPhoto }
)
@autobind
class Main extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      setWallpaperLoading: false,
      downloadLoading: false,
      downloadComplete: false
    };
  }

  componentDidMount() {
    const { photoData, getPhoto } = this.props;
    if (photoData.size === 0) {
      getPhoto();
    }
  }

  handleSetWallpaper() {
    const { photoData } = this.props;
    this.setState({ setWallpaperLoading: true });
    storage.get('pictures', (error, pictures) => {
      let hasPicture = false;
      let picturePath = path.join(
        os.homedir(),
        '/Pictures',
        `unsplash-${photoData.get('id')}.png`
      );
      picturePath = path.normalize(picturePath);
      if (pictures.list && pictures.list.length > 0) {
        pictures.list.forEach(picItem => {
          if (picItem.id === photoData.get('id')) {
            hasPicture = true;
          }
        });
      }
      if (hasPicture) {
        this.setWallpaper(picturePath, photoData, pictures);
      } else {
        axios
          .get(photoData.getIn(['urls', 'full']), {
            responseType: 'arraybuffer'
          })
          .then(response => {
            const base64Image = new Buffer.from(
              response.data,
              'binary'
            ).toString('base64');
            fs.writeFile(picturePath, base64Image, 'base64', () => {
              this.setWallpaper(picturePath, photoData, pictures);
            });
          });
      }
    });
  }

  setWallpaper(picturePath: string, photoData: any, pictures: any) {
    wallpaper
      .set(picturePath, { scale: 'stretch' })
      .then(() => {
        if (pictures.list && pictures.list.length > 0) {
          storage.set('pictures', {
            list: [...pictures.list, photoData.toJS()]
          });
        } else {
          storage.set('pictures', { list: [photoData.toJS()] });
        }
        this.setState({ setWallpaperLoading: false });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleDownload(url: string) {
    const { photoData } = this.props;
    this.setState({ downloadLoading: true });
    axios.get(url, { responseType: 'arraybuffer' }).then(response => {
      const base64Image = new Buffer.from(response.data, 'binary').toString(
        'base64'
      );
      let picturePath = path.join(
        os.homedir(),
        '/Downloads',
        `unsplash-${photoData.get('id')}.png`
      );
      picturePath = path.normalize(picturePath);
      fs.writeFile(picturePath, base64Image, 'base64', () => {
        this.setState({
          downloadLoading: false
        });
        new Notification('Download Completed!', {
          body: `Image saved in "${os.homedir()}/Downloads"`,
          icon: path.join(__dirname, '../resources/icons/64x64.png')
        });
      });
    });
  }

  render() {
    const { getPhotoLoading, getPhoto, photoData } = this.props;
    const { setWallpaperLoading, downloadLoading } = this.state;
    return (
      <StyledMain>
        <Navbar />
        <div
          className={`photoWrapper${
            getPhotoLoading || setWallpaperLoading ? ' disabled' : ''
          }`}
          style={{
            backgroundImage: `url(${photoData.getIn(['urls', 'small'])})`,
            backgroundColor: photoData.get('color')
          }}
          onClick={() => getPhoto(photoData.getIn(['urls', 'small']))}
        >
          <div className="buttonWrapper">
            {getPhotoLoading ? (
              <Loading color="#fff" size="16px" />
            ) : (
              <i className="fa fa-refresh" />
            )}
          </div>
        </div>
        <button
          className="setWallpaperButton"
          disabled={getPhotoLoading || setWallpaperLoading}
          onClick={this.handleSetWallpaper}
        >
          <span>Set as Wallpaper</span>
          {setWallpaperLoading && <Loading color="#666" size="14px" />}
        </button>
        <div className="bottomWrapper">
          <a className="autor" href={photoData.getIn(['links', 'html'])}>
            By{' '}
            <span>{`${photoData.getIn(['user', 'first_name'])} ${
              photoData.getIn(['user', 'last_name'])
                ? photoData.getIn(['user', 'last_name'])
                : ''
            }`}</span>
          </a>
          <button
            onClick={() =>
              this.handleDownload(photoData.getIn(['links', 'download']))
            }
            className={`download${
              getPhotoLoading || setWallpaperLoading || downloadLoading
                ? ' disabled'
                : ''
            }`}
          >
            Download
            {downloadLoading && <Loading color="#666" size="10px" />}
          </button>
        </div>
      </StyledMain>
    );
  }
}

export default Main;
