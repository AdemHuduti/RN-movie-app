import { combineReducers } from 'redux';
import ShowAllPopularMovies from './ShowAllPopularMoviesReducer';
import ShowAllTopRatedMovies from './ShowAllTopRatedMoviesReducer';
import ShowUpcomingMovies from './ShowAllUpcomingMoviesReducer';
import ShowPopularHome from './ShowPopularMoviesHome';
import ShowUpcomingHome from './ShowUpcomingMoviesHome';
import ShowToRatedHome from './ShowTopRatedMovies';
import OnTvMoviesHome from './ShowOnTvMoviesHome';
import OnTvMovies from './ShowAllOnTvMoviesReducer'

import TvShowHome from './TvShowsHome';
import AllTvShows from './TvAllPopularShowsReducer';
import TvTopRatedHome from './TvTopRatedShowsHome';
import AllTopRatedShows from './TvAllTopRatedShows';

import menu from './Menu';

export default combineReducers({
  // Movies
  showMovies: ShowAllPopularMovies,
  showHomePopularMovies: ShowPopularHome,
  upcomingMovies: ShowUpcomingMovies,
  showHomeUpcomingMovies: ShowUpcomingHome,
  showTopRatedMovies: ShowToRatedHome,
  showAllTopRated: ShowAllTopRatedMovies,
  onTvMoives: OnTvMoviesHome,
  allOnTvMovies: OnTvMovies,
  
  // Tv shows
  showTvShows: TvShowHome,
  showAllTvShows: AllTvShows,
  showTopRated: TvTopRatedHome,
  showAllTopRatedShows: AllTopRatedShows,
  
  // Menu
  menuIsOpen: menu.menuIsOpen,
  // state: (state = {}) => state
});
