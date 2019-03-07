# Unsplash Wallpapers
A simple menubar app for Mac, Windows and Linux that brings stunning wallpapers from Unsplash right to your desktop.

Mac             |  Windows
:--------------------------------------:|:------------------------------------------:
![mac](http://i.imgur.com/9rrYq3J.gif)  |  ![windows](http://i.imgur.com/dx2QhyD.gif)

### This project implemented by the following technologies:
* [Electron](https://github.com/electron)
* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reduxjs/redux)
* [styled-components](https://github.com/styled-components/styled-components)
* [axios](https://github.com/axios/axios)
* [wallpaper](https://github.com/sindresorhus/wallpaper)
* [electron-json-storage](https://github.com/electron-userland/electron-json-storage)

### Features:
* Get high quality wallpapers from [Unsplash](https://unsplash.com/).
* Work in any popular operating systems like Mac, Windows, and Linux.
* Save history of set wallpapers.
* Direct download every wallpaper.
* Run at startup system.
* and so on...

### Development:

First, place your [Unsplash client ID](https://unsplash.com/documentation#authorization) in the `.env` file:
```sh
UNSPLASH_CLIENT_ID=your_client_id
```

Then, run one of the following commands:
```bash
yarn && yarn dev
```
or
```bash
npm i && npm run dev
```

### Production:
Run one of the following commands:
```bash
yarn package
```
or
```bash
npm run package
```
