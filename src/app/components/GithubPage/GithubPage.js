import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
import GitHubLogin from 'react-github-login';

import styles from './GithubPage.scss';
import withStyles from '../../decorators/withStyles';
import {githubSignIn} from '../../../../actions/githubActions';

import GithubHome from '../GithubHome';
import GithubUser from '../GithubUser';
import Loader from '../Loader';

@withStyles(styles)
class GithubPage extends React.Component {
  constructor(props) {
    super(props);
  }

  responseGithub = (res) => {
    this.props.githubSignIn(res);
  }

  render() {
    return (
      <div className="githubPage">
        {
          this.props.user === '' ?
            <GithubHome /> :
            <GithubUser />
        }
      </div>
    );
  }
}

const mapStateToProps = ({ githubStates }) => {
  return {
    user: githubStates.user,
    token: githubStates.token
  }
};

export default connect(mapStateToProps, {
  githubSignIn
})(withRouter(GithubPage));

