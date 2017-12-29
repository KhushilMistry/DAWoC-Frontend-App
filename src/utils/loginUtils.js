import axios from 'axios';

export default {
  signUp: function (query) {
    return axios({
      method: 'post',
      url: 'http://localhost:8080/signup',
      params: query,
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
  },
  signIn: function (query) {
    return axios({
      method: 'post',
      url: 'http://localhost:8080/api/signin',
      params: query,
      headers: {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    });
  }
};