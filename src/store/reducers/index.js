import { combineReducers } from 'redux';
import ShowAllPopularMovies from './ShowAllPopularMoviesReducer';
import ShowPopularHome from './ShowPopularMoviesHome'
import ShowUpcomingMovies from './ShowAllUpcomingMoviesReducer';
import ShowUpcomingHome from './ShowUpcomingMoviesHome'
import menu from './Menu';

export default combineReducers({
  showMovies: ShowAllPopularMovies,
  showHomePopularMovies: ShowPopularHome,
  upcomingMovies: ShowUpcomingMovies,
  showHomeUpcomingMovies: ShowUpcomingHome,
  menuIsOpen: menu.menuIsOpen,
  // state: (state = {}) => state
});
