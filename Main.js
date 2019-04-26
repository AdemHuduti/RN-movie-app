import {createStackNavigator, createAppContainer} from "react-navigation";
import MovieHome from './src/screens/MovieHome'
import Choose from './src/screens/Choose';
import SingleMovie from './src/screens/SingleMovie';
import PopularMovies from './src/components/HomePopularMovie/PopularMovies';
import UpcomingAllMovies from './src/components/UpcomingMovies/UpcomingAllMovies';
import AllTopRatedMovies from './src/components/TopRatedMovies/AllTopRatedMovies';
import AllOnTvMovies from './src/components/OnTvMovies/OnTvAllMovies';

const NavigatorScreens = {
  Choose,
  MovieHome,
  PopularMovies,
  SingleMovie,
  UpcomingAllMovies,
  AllTopRatedMovies,
  AllOnTvMovies
};

const NavigatorOptions = {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
};

const MainNavigator = createStackNavigator(NavigatorScreens, NavigatorOptions);

export default createAppContainer(MainNavigator);