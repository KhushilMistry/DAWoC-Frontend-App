import loginUtils from '../src/utils/loginUtils';

export default {
  signIn: (query) => {
    return (dispatch) => {
      loginUtils.signIn(query)
        .then(({ data }) => {
          dispatch({ type: 'SIGN_IN', data: data });
        });
    };
  },
  signUp: (query) => {
    return (dispatch) => {
      loginUtils.signUp(query)
        .then(({ data }) => {
          dispatch({ type: 'SIGN_UP', data: data });
        });
    };
  },
};