import { combineReducers } from 'redux';

import { routerReducer as routing } from 'react-router-redux';
import loginStates from './loginReducer';
import githubStates from './githubReducer';

export default combineReducers({
  routing,
  loginStates,
  githubStates
});
