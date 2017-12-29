var _ = require('lodash');

const INITIAL_STATE = {
  user: '',
  message : ''
};

export default function (state = INITIAL_STATE, action) {
  const appState = Object.assign({}, state)

  switch (action.type) {
    case 'SIGN_IN':
      appState.message = action.data;
      appState.user = _.get(action.data.user, 0);
      break;
    case 'SIGN_UP':
      appState.message = action.data;
      appState.user = _.get(action.data.user, 0);
      break;

    default:
      return state;
  }
  return appState;
};