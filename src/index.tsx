import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MovieListScreen  from './screen/MovieListScreen';
import LoginScreen  from './screen/LoginScreen';
import BottomNavigationScreen from './screen/BottomNavigationScreen'

const Router = createStackNavigator(
  {
    LoginScreen,
    BottomNavigationScreen,
    MovieListScreen,
  },
  {
    initialRouteName: 'LoginScreen',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);