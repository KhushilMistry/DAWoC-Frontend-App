import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
var _ = require('lodash');


import styles from '../../style/common-login.scss';
import withStyles from '../../decorators/withStyles';
import {signUp} from '../../../../actions/loginActions';
import Auth from '../../../middlewares/Auth';

@withStyles(styles)
class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error : '',
      name: '',
      email: '',
      password: '',
      batch: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (_.get(nextProps.message,'success') === true) {
      Auth.authenticateUser(this.props.message.token);
      this.props.router.push('/');
    }
    else if (_.get(nextProps.message,'success') === false) {
      this.setState({
        error : nextProps.message.message
      });
    }
  }

  changeState = (event) => {
    let newState = this.state;
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  check = () => {
    if (this.state.name === '' || this.state.password === '' || this.state.batch === '' || this.state.email === '') {
      return false;
    }
    else {
      return true;
    }

  }


  sign_Up = () => {
    if (!this.check()) {
      this.setState({
        error : 'Please, Fill all the details.'
      });
      return;
    }
    
    this.props.signUp(this.state);
  };


  render() {
    return (
      <div>
        <div className="login-box">
          <p className="login-heading">Sign Up</p>
          <input className="login-input" name='name' placeholder="Name" onChange={(event) => this.changeState(event)}/><br/>
          <input className="login-input" name='email' placeholder="Email"
            onChange={(event) => this.changeState(event)}/><br/>
          <input className="login-input" name='password' placeholder="Password" type="password"
            onChange={(event) => this.changeState(event)}/><br />
          <input className="login-input" name='batch' placeholder="Passout Batch" type="number"
            onChange={(event) => this.changeState(event)}/><br/>
          <button className="login-button" onClick={this.sign_Up}>Sign Up</button>
          {this.state.error !== '' ? <div className="error-message">{this.state.error}</div> : <div className="error-message"><br /></div>}
          <p className="login-text">Already Signed Up ? <Link className="login-link" to="/login">Log in</Link></p>
        </div>
      </div>
    );
  }

}

const mapStateToProps = ({ loginStates }) => {
  return {
    user: loginStates.user,
    message: loginStates.message
  }
};

export default connect(mapStateToProps, {
  signUp
})(withRouter(SignUp));