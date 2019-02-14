# Unsplash Wallpapers
A simple menubar app for Mac, Windows and Linux that brings stunning wallpapers from Unsplash right to your desktop.
     
![screenshot](http://i.imgur.com/iSMRvje.gif)

### I've implemented this project using the following technologies:
* [Electron](https://github.com/electron)
* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reduxjs/redux)
* [styled-components](https://github.com/styled-components/styled-components)
* [axios](https://github.com/axios/axios)
* [wallpaper](https://github.com/sindresorhus/wallpaper)


### Features:
* Get high quality wallpapers from [Unsplash](https://unsplash.com/).
* Work in any popular operating systems like Mac, Windows, and Linux.
* Save history of set wallpapers.
* Direct download every wallpaper.
* Run at startup system.
* and so on...

### Development:

First, place your Unsplash API token in `.env` file instead `your_token`:
```sh
UNSPLASH_API_TOKEN=your_token
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
