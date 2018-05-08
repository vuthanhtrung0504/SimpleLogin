const initialState = {
  token: null,
  isLoading: false,
  errorMess: undefined,
  data: {
    email: '',
    password: ''
  }
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'AUTH':
      return { ...state, token: null, isLoading: true, errorMess: undefined };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        token: payload.token,
        isLoading: false,
        errorMess: undefined
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        token: null,
        isLoading: false,
        errorMess: payload.errorMess
      };
    case 'LOAD':
      return {
        ...state,
        data: {
          email: payload.email !== undefined ? payload.email : state.data.email,
          password:
            payload.password !== undefined
              ? payload.password
              : state.data.password
        }
      };
  }
  return state;
};

export default reducer;
