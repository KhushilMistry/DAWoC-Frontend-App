import appServer from './server';

appServer(function (app) {
  if (app.get('env') === 'development') {
    //require('./hotLoadServer')();
  }
});
