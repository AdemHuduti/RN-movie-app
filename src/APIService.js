import axios from 'axios';

// Api key
const API_KEY = 'b6ae17c5481c2abdc5c03bc07d7186e7';
const MOVIE_URL = 'https://api.themoviedb.org/3/movie/';
const TV_SHOW_URL = 'https://api.themoviedb.org/3/tv/';

// MOVIES
// Top rated movies
const TOP_RATED_MOVIES = `${MOVIE_URL}top_rated?api_key=${API_KEY}&language=en-US&page=1`

// Popular movies
const POPULAR_MOVIES = `${MOVIE_URL}popular?api_key=${API_KEY}&language=en-US&page=1`

// Upcoming movies
const UPCOMING_MOVIES = `${MOVIE_URL}upcoming?api_key=${API_KEY}&language=en-US&page=1`

// On TV movies
const ON_TV_MOVIES = `${MOVIE_URL}now_playing?api_key=${API_KEY}&language=en-US&page=1`


// TV SHOWS
// Popular tv-shows
const URL_TV = `${TV_SHOW_URL}popular?api_key=${API_KEY}&language=en-US&page=1`

// Top top rated tv-shows
const TOP_RATED_TV = `${TV_SHOW_URL}top_rated?api_key=${API_KEY}&language=en-US&page=1`

// On TV
const ON_TV_SHOWS = `${TV_SHOW_URL}on_the_air?api_key=${API_KEY}&language=en-US&page=1`

// Airing today
const AIRING_TODAY = `${TV_SHOW_URL}airing_today?api_key=${API_KEY}&language=en-US&page=1`


export default {
  getPopularMovies() {
    return axios({
      method: "GET",
      url: POPULAR_MOVIES
    })
  },
  getUpcomingMovies() {
    return axios({
      method: "GET",
      url: UPCOMING_MOVIES
    })
  },
  getTopRatedMovies() {
    return axios({
      method: "GET",
      url: TOP_RATED_MOVIES
    })
  },
  getOnTvMovies() {
    return axios({
      method: "GET",
      url: ON_TV_MOVIES
    })
  },
  getMoviesById(id) {
    return axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    })
  },
  getPopularTvShows() {
    return axios({
      method: "GET",
      url: URL_TV
    })
  },
  getShowsById(id) {
    return axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US&page=1`
    })
  },
}