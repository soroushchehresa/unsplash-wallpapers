# Unsplash Wallpapers
A simple menubar app for Mac, Windows and Linux that brings stunning wallpapers from Unsplash right to your desktop.

This project is an unofficial cross-platform version of [Unsplash Wallpapers](https://unsplash.com/wallpaper#mac-app) official application for Mac with more features.


## Demo:

#### Mac: 
<img src="http://i.imgur.com/GXMBuLn.gif" width="500px" />

#### Windows: 
<img src="http://i.imgur.com/5FAB6d8.gif" width="500px" />

#### Linux: 
<img src="http://i.imgur.com/lBDtKrc.gif" width="500px" />


### This project implemented by the following technologies:
* [Electron](https://github.com/electron)
* [React](https://github.com/facebook/react)
* [Redux](https://github.com/reduxjs/redux)
* [styled-components](https://github.com/styled-components/styled-components)
* [axios](https://github.com/axios/axios)
* [wallpaper](https://github.com/sindresorhus/wallpaper)
* [electron-json-storage](https://github.com/electron-userland/electron-json-storage)
* [immutable-js](https://github.com/immutable-js/immutable-js)
* [Flow](https://github.com/facebook/flow)
* [ESLint](https://github.com/eslint/eslint)

And so on...


### Features:
* Work on any popular operating systems like Mac, Windows, and Linux.
* Get high quality wallpapers from [Unsplash](https://unsplash.com/).
* Save history of set wallpapers.
* Automatic set wallpapers daily or weekly (optional).
* Run at startup system (optional).
* Download directly every wallpaper.
* Link to photographer profile on Unsplash.


### Starting Development:

First, place your [Unsplash access key](https://unsplash.com/developers) in the `.env`:
```sh
UNSPLASH_ACCESS_KEY=your_access_key
```

Then, run one of the following commands:
```bash
yarn && yarn dev
```
or
```bash
npm i && npm run dev
```


### Packaging for Production:

Run one of the following commands:
```bash
yarn package
```
or
```bash
npm run package
```

<br />

### TODO:

* Add animation to router.
* Write tests.
