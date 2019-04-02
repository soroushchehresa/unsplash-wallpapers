import { remote } from 'electron';
import { setActiveTheme } from 'app/containers/Settings/redux';

export default (store) => {
  if (process.platform === 'darwin') {
    const { systemPreferences } = remote;
    const setOSTheme = () => {
      const reduxState = store.getState();
      if (reduxState.getIn(['Settings', 'isChangeAutomaticActiveTheme'])) {
        store.dispatch(setActiveTheme(systemPreferences.isDarkMode() ? 'Dark' : 'Light'));
      }
    };
    systemPreferences.subscribeNotification(
      'AppleInterfaceThemeChangedNotification',
      setOSTheme,
    );
    setOSTheme();
  }
};
