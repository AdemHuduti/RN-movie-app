export default (state = [], action) => {
  switch(action.type) {
    case 'ON_TV_MOVIES':
      return state.concat(action.data.results);
    
    default: return state;
  }
}
