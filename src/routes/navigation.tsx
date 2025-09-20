import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import HomePage from '../pages/Home.page';
import AuthPage from '../pages/Auth.page';
import useIsSignedIn from '../hooks/auth/useIsSignedIn';
import useIsSignedOut from '../hooks/auth/useIsSignedOut';

const RootStack = createNativeStackNavigator({
  groups: {
    LoggedIn: {
      if: useIsSignedIn,
      screens: {
        Home: HomePage,
      },
    },
    LoggedOut: {
      if: useIsSignedOut,
      screens: {
        Auth: {
          screen: AuthPage,
          options: {
            headerShown: false,
          },
        },
      },
    },
  },
});

const AppNavigation = createStaticNavigation(RootStack);

export default AppNavigation;
