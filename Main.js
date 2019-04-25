import {createStackNavigator, createAppContainer} from "react-navigation";
import Home from './src/screens/Home'
import PopularMovies from './src/screens/PopularMovies';
import SingleMovie from './src/screens/SingleMovie';
import UpcomingAllMovies from './src/components/UpcomingMovies/UpcomingAllMovies';

const NavigatorScreens = {
  Home,
  PopularMovies,
  SingleMovie,
  UpcomingAllMovies
};

const NavigatorOptions = {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false,
  }
};

const MainNavigator = createStackNavigator(NavigatorScreens, NavigatorOptions);

export default createAppContainer(MainNavigator);