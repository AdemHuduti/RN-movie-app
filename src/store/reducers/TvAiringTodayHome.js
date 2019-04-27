export default (state = [], action) => {
  switch(action.type) {

    case 'GET_AIRING_TODAY_SHOWS_FOR_HOME_SCREEN':
      return state.concat(action.data.results.slice(0, 10));
    
    default: return state;
  }
}
