import axios from 'axios';

// Api key
const API_KEY = 'b6ae17c5481c2abdc5c03bc07d7186e7';
const MOVIE_URL = 'https://api.themoviedb.org/3/movie/';
const TV_SHOW_URL = 'https://api.themoviedb.org/3/tv/';

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
const ON_TV = `${TV_SHOW_URL}on_the_air?api_key=${API_KEY}&language=en-US&page=1`

// Airing today


export default {
  getPopularHomeMovies() {
    return axios({
      method: "GET",
      url: POPULAR_MOVIES
    })
  },
  getUpcomingHomeMovies() {
    return axios({
      method: "GET",
      url: UPCOMING_MOVIES
    })
  },

  getMoviesById(id) {
    return axios({
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    })
  }
}