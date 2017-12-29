import App from './app/app';
import Github from './app/components/GithubPage';
import LoginPage from './app/components/LoginPage';
import DashboardPage from './app/components/DashboardPage'
/*import HomePage from './app/components/HomePage';
import SignUpPage from './app/components/SignUpPage';*/
//import Auth from './middlewares/Auth';


const routes = {
  // base component (wrapper for the whole application).
  component: App,
  childRoutes: [
    {
      path: '/',
      getComponent:(location, callback) => {
        callback(null, Github);
      }
    },
    {
      path: '/dawoc_login',
      getComponent: (location, callback) => {
        callback(null, LoginPage);
      }
    },
    {
      path: '/dawoc_admin',
      getComponent: (location, callback) => {
        callback(null, DashboardPage);
      }
    }
    /*{
      path: '/github',
      getComponent: (location, callback) => {
        console.log(location,callback);
        if (Auth.isUserAuthenticated()) {
          callback(null, DashboardPage);
        } else {
          callback(null, Github);
        }
      }
    },
    {
      path: '/signup',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, DashboardPage);
        } else {
          callback(null, SignUpPage);
        }
      }
    },
    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        Auth.deauthenticateUser();
        replace('/');
      }
    }*/

  ]
};

export default routes;
