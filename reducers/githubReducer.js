var _ = require('lodash');

const INITIAL_STATE = {
  user: '',
  token: '',
  admin: false,
  loading: false,
  projects: '',
  users: ''
};

export default function (state = INITIAL_STATE, action) {
  const appState = Object.assign({}, state)

  switch (action.type) {
    case 'GITHUB_SIGN_IN':
      appState.user = action.data.data.user;
      appState.projects = action.data.data.projects;
      break;
    case 'GITHUB_TOKEN':
      appState.token = action.token;
      break;
    case 'GITHUB_ADMIN':
      appState.token = action.admin;
      break;
    case 'GITHUB_LOGOUT':
      appState.user = '';
      appState.admin = false;
      appState.token = '';
      break;
    case 'LOADING_START':
      appState.loading = true;
      break;
    case 'LOADING_END':
      appState.loading = false;
      break;
    case 'ADMIN_LOGIN':
      appState.admin = action.data.data.admin;
      appState.users = action.data.data.users;
      appState.projects = action.data.data.projects;
      break;
    case 'ADMIN_LOGOUT':
      appState.admin = false;
      appState.users = '';
      break;
    case 'PROJECTS_LOAD':
      console.log(action.data.data.projects);
      appState.projects = action.data.data.projects;
      break;


    default:
      return state;
  }
  return appState;
};