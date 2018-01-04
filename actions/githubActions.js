import axios from 'axios';

export default {
  githubSignIn: (res) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_START'});
      const query = res.code;
      axios({
        method: 'post',
        url: 'https://da-woc.herokuapp.com/github',
        params: query,
        headers: { "Access-Control-Allow-Origin": "https://da-woc.herokuapp.com/" }
      }).then((res) => {
        dispatch({ type: 'GITHUB_TOKEN', token: res.data });
        const queryToken = res.data;
        axios({
          method: 'post',
          url: 'https://da-woc.herokuapp.com/user',
          params: queryToken,
          headers: { "Access-Control-Allow-Origin": "https://da-woc.herokuapp.com/" }
        }).then((res) => {
          dispatch({ type: 'GITHUB_SIGN_IN', data: res });
          dispatch({ type: 'LOADING_END'});
        });
      });
    };
  },
  githubLogOut: (query) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_START'});
      dispatch({ type: 'GITHUB_LOGOUT' });
      dispatch({ type: 'LOADING_END'});
    };
  },
  adminSignIn: (query) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_START'});
      axios({
        method: 'post',
        url: 'https://da-woc.herokuapp.com/admin',
        params: query,
        headers: { "Access-Control-Allow-Origin": "https://da-woc.herokuapp.com/" }
      }).then((res) => {
        dispatch({ type: 'ADMIN_LOGIN' , data : res});
        dispatch({ type: 'LOADING_END'});
      });
    };
  },
  adminSignOut: () => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_START'});
      dispatch({ type: 'ADMIN_LOGOUT' });
      dispatch({ type: 'LOADING_END'});
    };
  },
  adminPostProjects: (query) => {
    return (dispatch) => {
      dispatch({ type: 'LOADING_START'});
      axios({
        method: 'post',
        url: 'https://da-woc.herokuapp.com/project',
        params: query,
        headers: { "Access-Control-Allow-Origin": "https://da-woc.herokuapp.com/" }
      }).then((res) => {
        dispatch({ type: 'PROJECTS_LOAD' , data : res});
        dispatch({ type: 'LOADING_END'});
      });
    };
  }
};