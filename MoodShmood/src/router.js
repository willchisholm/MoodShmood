import {
  // StackNavigator,
  // TabNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import { MainTabBar } from './navigation/main_tab_bar';
// import LogIn from './login';
import Welcome from './welcome';

// eslint-disable-next-line import/prefer-default-export
export const createRootNavigator = (props) => {
  return createSwitchNavigator(
    {
      WelcomeScreen: Welcome,
      Main: MainTabBar,
    },
    {
      initialRouteName: 'Welcome',
    },
  );
};
