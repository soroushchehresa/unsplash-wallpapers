import React, { Component } from 'react';
import { remote } from 'electron';
import storage from 'electron-json-storage';
import Navbar from 'app/components/Navbar';
import AutoLaunch from 'auto-launch';
import StyledSettings from './style';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunAtStartup: false
    };
  }

  componentDidMount() {
    storage.get('isRunAtStartup', (error, status) => {
      this.setState({
        isRunAtStartup: status
      });
    });
  }

  handleQuit = () => remote.getCurrentWindow()
    .close();

  handleRunInStartup = ({ target: { checked } }) => {
    this.setState({
      isRunAtStartup: checked
    });
    storage.set('isRunAtStartup', checked);
    const minecraftAutoLauncher = new AutoLaunch({
      name: 'Unsplash Wallpapers',
      path: '/Applications/Unsplash Wallpapers.app' // eslint-disable-line
    });
    if (checked) {
      minecraftAutoLauncher.enable();
    } else {
      minecraftAutoLauncher.disable();
    }
  };

  render() {
    const { isRunAtStartup } = this.state;
    return (
      <StyledSettings>
        <Navbar />
        <div className="container">
          <label className="run-at-startup">
            Run at startup
            <input
              type="checkbox"
              onChange={this.handleRunInStartup}
              checked={isRunAtStartup}
            />
          </label>
          <button onClick={this.handleQuit} className="quit">
            Quit Unsplash Wallpapers
          </button>
          <p className="version">
            verion: {require('../../../package').version}
          </p>
        </div>
      </StyledSettings>
    );
  }
}
