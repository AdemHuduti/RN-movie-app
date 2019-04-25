import { combineReducers } from 'redux';
import ShowAllPopularMovies from './ShowAllPopularMoviesReducer';
import ShowUpcomingMovies from './ShowAllUpcomingMoviesReducer';
import ShowAllTopRatedMovies from './ShowAllTopRatedMoviesReducer';
import ShowPopularHome from './ShowPopularMoviesHome';
import ShowUpcomingHome from './ShowUpcomingMoviesHome';
import ShowToRatedHome from './ShowTopRatedMovies';
import menu from './Menu';

export default combineReducers({
  showMovies: ShowAllPopularMovies,
  showHomePopularMovies: ShowPopularHome,
  upcomingMovies: ShowUpcomingMovies,
  showHomeUpcomingMovies: ShowUpcomingHome,
  showTopRatedMovies: ShowToRatedHome,
  showAllTopRated: ShowAllTopRatedMovies,
  menuIsOpen: menu.menuIsOpen,
  // state: (state = {}) => state
});
