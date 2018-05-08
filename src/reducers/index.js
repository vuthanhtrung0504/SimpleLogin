import authReducer from '../containers/Login/reducer';
import { reducer as formReducer } from 'redux-form';

const reducer = {
  form: formReducer,
  authReducer,
};

export default reducer;
