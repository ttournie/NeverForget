// Here we have a function which accepts a map of async states to action types
// as well as a thunk.
const asyncActionCreator = (asyncTypes, fetchThunk, callback) => (...arg) => async (dispatch) => {
  dispatch({ type: asyncTypes.pending });
  try {
    const response = await fetchThunk(...arg);
    let payload = response;
    if (response.data) {
      payload = response.data;
    }
    dispatch({ type: asyncTypes.complete, payload });
    if (typeof callback !== 'undefined') {
      callback(payload);
    }
  } catch (err) {
    dispatch({ type: asyncTypes.error });
  }
};


export default asyncActionCreator;
