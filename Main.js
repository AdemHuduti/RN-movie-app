import {createStackNavigator, createAppContainer} from "react-navigation";
import MovieHome from './src/screens/MovieHome';
import TvShowHome from './src/screens/TvShowHome';
import Choose from './src/screens/Choose';
import SingleMovie from './src/screens/SingleMovie';
import PopularMovies from './src/components/HomePopularMovie/PopularMovies';
import UpcomingAllMovies from './src/components/UpcomingMovies/UpcomingAllMovies';
import AllTopRatedMovies from './src/components/TopRatedMovies/AllTopRatedMovies';
import AllOnTvMovies from './src/components/OnTvMovies/OnTvAllMovies';

import AllPopularTvShows from './src/components/TvPopularShows/AllPopularTvShows';
import SingleTvShow from './src/screens/SingleTvShow';

const NavigatorScreens = {
  Choose,
  TvShowHome,
  MovieHome,
  PopularMovies,
  SingleMovie,
  SingleTvShow,
  UpcomingAllMovies,
  AllTopRatedMovies,
  AllOnTvMovies,
  AllPopularTvShows
};

const NavigatorOptions = {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
};

const MainNavigator = createStackNavigator(NavigatorScreens, NavigatorOptions);

export default createAppContainer(MainNavigator);