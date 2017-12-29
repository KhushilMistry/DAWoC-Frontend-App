import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import GitHubLogin from 'react-github-login';
import FaGithub from 'react-icons/lib/fa/github';

import styles from './GithubHome.scss';
import withStyles from '../../decorators/withStyles';
import {githubSignIn} from '../../../../actions/githubActions';
import Loader from '../Loader';

@withStyles(styles)
class GithubHome extends React.Component {
  constructor(props) {
    super(props);
  }

  responseGithub = (res) => {
    this.props.githubSignIn(res);
  }


  render() {

    return (
      <div>
        { this.props.loading ? <Loader /> :
          <div className="githubHome">
            <a href="http://woc.daiict.ac.in/" target="_blank">
              <div className="coverLogo">
              </div>
            </a>
            <div className="githubContent">
              <div className="githubHeading">{'DAWoC'}</div>
              <div className="smallHeading">{'DA-IICT Winter of Code'}</div>
              <div className="normalHeading">{'organised by Google Developer Student Club DA-IICT'}</div>
              <GitHubLogin
                className="githubButton"
                clientId="Iv1.2c25f6b5db9121be"
                redirectUri=""
                onSuccess={this.responseGithub}
              >
                <FaGithub className="githubIcon"/>
                {'Sign in with Github'}
              </GitHubLogin>
            </div>
          </div>}
      </div>
    );
  }
}

const mapStateToProps = ({ githubStates }) => {
  return {
    user: githubStates.user,
    token: githubStates.token,
    loading: githubStates.loading
  }
};

export default connect(mapStateToProps, {
  githubSignIn
})(withRouter(GithubHome));

