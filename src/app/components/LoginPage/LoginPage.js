import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
var _ = require('lodash');


import styles from '../../style/common-login.scss';
import withStyles from '../../decorators/withStyles';
import {adminSignIn} from '../../../../actions/githubActions';
import Loader from '../Loader';

@withStyles(styles)
class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      email: '',
      password: ''
    };
  }

  componentDidMount() {
  }



  changeState = (event) => {
    let newState = this.state;
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  check = () => {
    if (this.state.email === '' || this.state.password === '') {
      return false;
    }
    else {
      return true;
    }

  }


  sign_In = () => {
    if (!this.check()) {
      this.setState({
        error: 'Please, Fill all the details.'
      });
      return;
    }

    this.props.adminSignIn(this.state);
  };

  render() {
    if (this.props.admin === true) {
      this.props.router.push('/dawoc_admin');
    }
    return (
      <div>
        { this.props.loading ? <Loader /> :
          <div className="login-box">
            <p className="login-heading">Log In</p>
            <input className="login-input" placeholder="Email" name="email"
              onChange={(event) => this.changeState(event)}/><br/>
            <input className="login-input" placeholder="Password" name="password" type="password"
              onChange={(event) => this.changeState(event)}/><br />
            <button className="login-button" onClick={this.sign_In}>Log in</button>
            {this.state.error !== '' ? <div className="error-message">{this.state.error}</div> :
              <div className="error-message"><br /></div>}
          </div>
        }
      </div>
    );
  }

}

const mapStateToProps = ({ githubStates }) => {
  return {
    admin: githubStates.admin,
    loading: githubStates.loading
  }
};

export default connect(mapStateToProps, {
  adminSignIn
})(withRouter(LoginPage));
