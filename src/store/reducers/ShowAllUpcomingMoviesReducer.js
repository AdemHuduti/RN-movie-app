export default (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_UPCOMING_MOVIES':
      return state.concat(action.data.results);
      
    default: return state;
  }
}
