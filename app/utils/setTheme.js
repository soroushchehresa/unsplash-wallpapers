import { remote } from 'electron';
import { setActiveTheme } from 'app/containers/Settings/redux';

export default (store) => {
  if (process.platform === 'darwin') {
    const { systemPreferences } = remote;
    const setOSTheme = () => {
      const reduxState = store.getState();
      const operationSystemTheme = systemPreferences.isDarkMode() ? 'Dark' : 'Light';
      if (reduxState.getIn(['Settings', 'isChangeAutomaticActiveTheme']) &&
        (operationSystemTheme !== reduxState.getIn(['Settings', 'activeTheme']))) {
        store.dispatch(setActiveTheme(operationSystemTheme));
      }
    };
    systemPreferences.subscribeNotification(
      'AppleInterfaceThemeChangedNotification',
      setOSTheme,
    );
    setOSTheme();
  }
};
