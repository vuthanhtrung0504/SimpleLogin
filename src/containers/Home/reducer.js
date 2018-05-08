import Immutable from 'immutable';

const initialState = Immutable.fromJS({
  token: null,
  isLoading: false,
  errorMess: undefined,
});

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'AUTH':
      return state.merge({
        token: null,
        isLoading: true,
        errorMess: undefined,
      });
    case 'AUTH_SUCCESS':
      return state.merge({
        token: payload.token,
        isLoading: false,
        errorMess: undefined,
      });
    case 'AUTH_FAILURE':
      return state.merge({
        token: null,
        isLoading: false,
        errorMess: payload.errorMess,
      });
  }
  return state;
};

export default reducer;
