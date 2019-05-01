<p align="center">
  <img src="http://i.imgur.com/bHaex3g.png" width="100%" />
</p>

# Support
<a href="https://www.patreon.com/soroushchehresa">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

<br />

# Unsplash Wallpapers


<div>
  <!-- Version -->
  <a href="https://marktext.github.io/website">
    <img src="https://badge.fury.io/gh/soroushchehresa%2Funsplash-wallpapers.svg" alt="website">
  </a>
  <!-- License -->
  <a href="https://github.com/soroushchehresa/unsplash-wallpapers/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/soroushchehresa/unsplash-wallpapers.svg" alt="LICENSE">
  </a>
  <!-- Downloads total -->
  <a href="https://github.com/soroushchehresa/unsplash-wallpapers/releases">
    <img src="https://img.shields.io/github/downloads/soroushchehresa/unsplash-wallpapers/total.svg" alt="total download">
  </a>
  <!-- Downloads latest release -->
  <a href="https://github.com/soroushchehresa/unsplash-wallpapers/releases/latest">
    <img src="https://img.shields.io/github/downloads/soroushchehresa/unsplash-wallpapers/v1.1.0/total.svg" alt="latest download">
  </a>
</div>
  
<br />
  
A simple menubar app for Mac, Windows and Linux that brings stunning wallpapers from Unsplash right to your desktop.
Works on macOS 10.12+, Windows 10+ and Linux.

This project is an unofficial cross-platform desktop application based on [Unsplash Wallpapers official application for Mac](https://unsplash.com/wallpaper#mac-app) with more features and better performance.

## Download and Install:

![platform](https://img.shields.io/static/v1.svg?label=Platform&message=Linux-64%20|%20macOS-64%20|%20Win-32%20|%20Win-64&style=for-the-badge)

| ![](https://raw.githubusercontent.com/wiki/ryanoasis/nerd-fonts/screenshots/v1.0.x/mac-pass-sm.png)                                                                                                  | ![](https://raw.githubusercontent.com/wiki/ryanoasis/nerd-fonts/screenshots/v1.0.x/windows-pass-sm.png)                                                                                                          | ![](https://raw.githubusercontent.com/wiki/ryanoasis/nerd-fonts/screenshots/v1.0.x/linux-pass-sm.png)                                                                                                                        |
|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| [![latest version](https://img.shields.io/github/downloads/soroushchehresa/unsplash-wallpapers/latest/Unsplash.Wallpapers-1.1.0.dmg.svg)](https://github.com/soroushchehresa/unsplash-wallpapers/releases/download/v1.1.0/Unsplash.Wallpapers-1.1.0.dmg) | [![latest version](https://img.shields.io/github/downloads/soroushchehresa/unsplash-wallpapers/latest/Unsplash.Wallpapers.Setup.1.1.0.exe.svg)](https://github.com/soroushchehresa/unsplash-wallpapers/releases/download/v1.1.0/Unsplash.Wallpapers.Setup.1.1.0.exe) | [![latest version](https://img.shields.io/github/downloads/soroushchehresa/unsplash-wallpapers/latest/Unsplash.Wallpapers.1.1.0.AppImage.svg)](https://github.com/soroushchehresa/unsplash-wallpapers/releases/download/v1.1.0/Unsplash.Wallpapers.1.1.0.AppImage) |


## Demo:

#### Mac:
<img src="http://i.imgur.com/aGjfvmE.gif" width="500px" />


#### Other platforms demo: <a href="http://i.imgur.com/5FAB6d8.gif" target="_blank">Windows</a> | <a href="http://i.imgur.com/lBDtKrc.gif" target="_blank">Linux</a>

## This project implemented by the following technologies:
* [Electron](https://github.com/electron)
* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reduxjs/redux)
* [redux-saga](https://github.com/redux-saga/redux-saga)
* [styled-components](https://github.com/styled-components/styled-components)
* [Axios](https://github.com/axios/axios)
* [Wallpaper](https://github.com/sindresorhus/wallpaper)
* [electron-json-storage](https://github.com/electron-userland/electron-json-storage)
* [immutable-js](https://github.com/immutable-js/immutable-js)
* [Flow](https://github.com/facebook/flow)
* [ESLint](https://github.com/eslint/eslint)


## Features:
* Load high-quality wallpapers based on Unsplash popular categories.
* Automatic update (cloud-hosted builds)
* Work on any popular operating systems like Mac, Windows, and Linux.
* Save history of set wallpapers.
* Automatic set wallpapers daily or weekly (optional).
* Run at startup system (optional).
* Dark mode (optional or auto by Mojave appearance on Mac).
* Download directly every wallpaper.
* Link to photographer profile on Unsplash website.


## Let's run:

#### Clone the project:
```bash
$ git clone https://github.com/soroushchehresa/unsplash-wallpapers.git unsplash-wallpapers
```

#### Starting Development:

First, place your [Unsplash access key](https://unsplash.com/developers) in the `.env`:
```sh
UNSPLASH_ACCESS_KEY=your_access_key
```

Then, run one of the following commands:
```bash
$ yarn && yarn dev

# OR

$ npm i && npm run dev
```


#### Packaging for Production:

First, change `package.json => build => publish => owner` to your GitHub username.

Second, place following variables in the `.env`:
* `UNSPLASH_ACCESS_KEY` - Your [Unsplash access key](https://unsplash.com/developers)
* `GH_TOKEN` - Your GitHub token to publish the release
* `CSC_LINK` - Path or link to your Apple Mac developer certificates (just for packaging on Mac)
* `CSC_KEY_PASSWORD` - Your Apple Mac developer certificate password (just for packaging on Mac)

Then, run one of the following commands:
```bash
$ yarn && yarn package

# OR

$ npm i && npm run package
```
