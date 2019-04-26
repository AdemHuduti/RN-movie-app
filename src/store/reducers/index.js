import { combineReducers } from 'redux';
import ShowAllPopularMovies from './ShowAllPopularMoviesReducer';
import ShowAllTopRatedMovies from './ShowAllTopRatedMoviesReducer';
import ShowUpcomingMovies from './ShowAllUpcomingMoviesReducer';
import ShowPopularHome from './ShowPopularMoviesHome';
import ShowUpcomingHome from './ShowUpcomingMoviesHome';
import ShowToRatedHome from './ShowTopRatedMovies';
import OnTvMoviesHome from './ShowOnTvMoviesHome';
import OnTvMovies from './ShowAllOnTvMoviesReducer'
import menu from './Menu';

export default combineReducers({
  showMovies: ShowAllPopularMovies,
  showHomePopularMovies: ShowPopularHome,
  upcomingMovies: ShowUpcomingMovies,
  showHomeUpcomingMovies: ShowUpcomingHome,
  showTopRatedMovies: ShowToRatedHome,
  showAllTopRated: ShowAllTopRatedMovies,
  onTvMoives: OnTvMoviesHome,
  menuIsOpen: menu.menuIsOpen,
  allOnTvMovies: OnTvMovies
  // state: (state = {}) => state
});
