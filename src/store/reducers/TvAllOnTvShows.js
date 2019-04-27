export default (state = [], action) => {
  switch (action.type) {
    case 'GET_ALL_ON_TV_SHOWS':
      return state.concat(action.data.results);
      
    default: return state;
  }
}
