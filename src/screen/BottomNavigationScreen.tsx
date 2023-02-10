import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import MovieListScreen from './MovieListScreen';
import FavoriteListScreen from './FavoriteListScreen';

const MovieListScreenRoute = () => <MovieListScreen/>;

const FavoriteScreen = () => <FavoriteListScreen/>;


const BottomNavigationScreen  = () => {
  const [index, setIndex] = React.useState(0);

  const [routes] = React.useState([
    { key: 'movieListRoute', title: 'MovieList', focusedIcon: 'album' },
    { key: 'favouriteScreen', title: 'Favorites', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
    ]);
    

  const renderScene = BottomNavigation.SceneMap({
    movieListRoute: MovieListScreenRoute,
    favouriteScreen: FavoriteScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    
    />
  );
};

export default  BottomNavigationScreen