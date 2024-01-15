// action creator
export const setData = (data) => {
  return {
    type: 'SET_DATA',
    payload: data,
  }
}
// reducer
export const dataReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_DATA':
      return action.payload; 
    default:
      return state;
  }
};
