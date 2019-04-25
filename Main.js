import {createStackNavigator, createAppContainer} from "react-navigation";
import Home from './src/screens/Home'
import PopularMovies from './src/components/HomePopularMovie/PopularMovies';
import SingleMovie from './src/screens/SingleMovie';
import UpcomingAllMovies from './src/components/UpcomingMovies/UpcomingAllMovies';
import AllTopRatedMovies from './src/components/TopRatedMovies/AllTopRatedMovies';

const NavigatorScreens = {
  Home,
  PopularMovies,
  SingleMovie,
  UpcomingAllMovies,
  AllTopRatedMovies
};

const NavigatorOptions = {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
};

const MainNavigator = createStackNavigator(NavigatorScreens, NavigatorOptions);

export default createAppContainer(MainNavigator);