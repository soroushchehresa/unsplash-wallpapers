// @flow /*

const { app, BrowserWindow, Tray, shell, nativeImage } = require('electron');
const AutoLaunch = require('auto-launch');
app.on('ready', () => {
  const tray = new Tray(nativeImage.createFromDataURL('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2tpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDozYTRmMzAxMS00N2VjLTRmODEtOTY0Ny0zMDVlYjg3NDg1YzciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NENDMjYxN0EyNThCMTFFOTlDQUFFMjI3OTUzMTEzMUYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NENDMjYxNzkyNThCMTFFOTlDQUFFMjI3OTUzMTEzMUYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUNBRDk2MDcyMkU2MTFFOUIyRTQ5QzU0QTc1MDFBMDQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUNBRDk2MDgyMkU2MTFFOUIyRTQ5QzU0QTc1MDFBMDQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4w6K1bAAABR0lEQVR42syUT0rEMBTG06QzVZR2IehCN9IrSC9QuvEUnkBc6VVm5xVcudEDiJvu6wkGNzI4VNLW+j18qSHTQi0D+uAHTfLy8f6kz2vbVmzTpNiy+eajLEtRFIWgiD3PM9uH4AQ0vKaDGhRA00bTNCKKIhHH8bcHCRB5nosgCITv+zY3oAGaqcESnBofKaVI07TT6SKkqLTWwqmptDA2d9OkKHtrqJQaU2PFqf84SblZwwF7B6/g06rhm7UebsqA3YI7R5DyW04VXDG/fzawY3DJdWv57BHcO3f22O+AI6eavoCFK3gErp3LXo/gDrjiN2rsyQjaXaTaVM7lj56sKPq1s7ce++vpgc5P7vIZuAAzXpPQPginCp4zfzdtpPU/yrquZ1NEMKl2N1IOw3CVZdkDRBUGxeipW1XVPEmS5+6d/fuJ/SXAAGOpZ34VQkQTAAAAAElFTkSuQmCC'));
  let window = null;

  const showWindow = () => {
    const trayPos = tray.getBounds();
    const windowPos = window.getBounds();
    let x = null;
    let y = 0;
    if (process.platform === 'darwin') {
      x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2));
      y = Math.round(trayPos.y + trayPos.height);
    } else {
      x = Math.round(trayPos.x + (trayPos.width / 2) - (windowPos.width / 2));
      y = Math.round(trayPos.y + trayPos.height * 10);
    }

    window.setPosition(x, y, false);
    window.show();
    window.focus();
  };

  const toggleWindow = () => {
    if (window.isVisible()) {
      window.hide();
    } else {
      showWindow();
    }
  };

  tray.on('click', (event) => {
    toggleWindow();

    if (window.isVisible() && process.defaultApp && event.metaKey) {
      window.openDevTools({ mode: 'detach' });
    }
  });

  window = new BrowserWindow({
    width: 375,
    height: 372,
    show: false,
    frame: false,
    resizable: false
  });

  window.loadURL(`file://${__dirname}/app.html`);

  window.on('blur', () => {
    if (!window.webContents.isDevToolsOpened()) {
      window.hide();
    }
  });

  window.on('show', () => {
    tray.setHighlightMode('always');
  });

  window.on('hide', () => {
    tray.setHighlightMode('never');
  });

  window.webContents.on('will-navigate', (event, url) => {
    event.preventDefault();
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url);
    }
  });

});

const minecraftAutoLauncher = new AutoLaunch({
  name: 'Unsplash Wallpapers',
  path: '/Applications/Unsplash\ Wallpapers.app' // eslint-disable-line
});
minecraftAutoLauncher.enable();
minecraftAutoLauncher.isEnabled()
  .then(isEnabled => {
    if (!isEnabled) {
      return minecraftAutoLauncher.enable();
    }
    return null;
  })
  .catch(err => {
    console.log(err);
  });
