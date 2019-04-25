export default (state = [], action) => {
  switch(action.type) {
    case 'GET_TOP_RATED_MOVIES':
      return state.concat(action.data.results);
    
    default: return state;
  }
}
