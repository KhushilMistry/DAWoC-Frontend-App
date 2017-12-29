import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';
var _ = require('lodash');
import {Row, Col, Container} from 'react-grid-system';


import styles from './Dashboard.scss';
import withStyles from '../../decorators/withStyles';
import {adminSignOut, adminPostProjects} from '../../../../actions/githubActions';
import Loader from '../Loader';

@withStyles(styles)
class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      project: false,
      user: true,
      addProject: false,
      name : '',
      mentor : '',
      language : '',
      desc : '',
      link : ''
    };
  }

  userSelect = () => {
    this.setState({
      project: false,
      user: true,
      addProject: false
    });
  }

  projectSelect = () => {
    this.setState({
      project: true,
      user: false,
      addProject: false
    });
  }

  addProject = () => {
    this.setState({
      project: false,
      user: false,
      addProject: true
    });
  }

  adminLogout = () => {
    this.props.adminSignOut();
    this.props.router.push('/dawoc_login');
  }

  changeState = (event) => {
    let newState = this.state;
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  projectAdd = () => {
    this.props.adminPostProjects(this.state);
  }

  componentDidMount() {

  }

  render() {
    if (this.props.admin === false) {
      this.props.router.push('/dawoc_login');
    }
    return (
      <div>
        { this.props.loading ? <Loader /> :
          <div>
            <div className="adminNavBar">
              <a onClick={() => this.userSelect()}>Users</a>
              <a onClick={() => this.projectSelect()}>Projects</a>
              <a onClick={() => this.addProject()}>Add Projects</a>
              <a onClick={() => this.adminLogout()}>Logout</a>
            </div>
            <div className="adminList">
              {this.state.user && <p className="adminHeading">{this.props.users.length}{' Participates'}</p>}
              <Container>
                {
                  this.state.user && this.props.admin &&
                  this.props.users.map((user, index) => {
                    return <div key={index} className="adminUserCard">
                      <img src={user.image}/>
                      <span className="adminUserName">
                        {user.username} <br />
                        {user.name}<br />
                        {user.email} <br />
                        <a href={user.repos}>Repository</a>
                      </span>
                    </div>
                  })
                }
                {
                  this.state.project && this.props.admin &&
                  this.props.projects.map((project, index) => {
                    return <div key={index} className="githubProjectCard">
                      <div className="githubProjectName">
                        <a href={project.link} target="_blank">{project.name}</a>
                      </div>
                      <div className="githubProjectLanguage">
                        {project.language}
                      </div>
                      <div className="githubProjectDescription">
                        {project.desc}
                      </div>
                      <div className="githubProjectMentor">
                        {'Mentor : ' + project.mentor}
                      </div>
                    </div>
                  })
                }
                {
                  this.state.addProject && this.props.admin &&
                  <Container>
                    <p className="inputHeading">{'Name'}</p>
                    <input className="login-input" placeholder="Name" name="name"
                      onChange={(event) => this.changeState(event)}/><br/>
                    <p className="inputHeading">{'Mentor'}</p>
                    <input className="login-input" placeholder="Mentor" name="mentor"
                      onChange={(event) => this.changeState(event)}/><br/>
                    <p className="inputHeading">{'Language'}</p>
                    <input className="login-input" placeholder="Language" name="language"
                      onChange={(event) => this.changeState(event)}/><br/>
                    <p className="inputHeading">{'Description'}</p>
                    <input className="login-input" placeholder="Description" name="desc"
                      onChange={(event) => this.changeState(event)}/><br/>
                    <p className="inputHeading">{'Link'}</p>
                    <input className="login-input" placeholder="Link" name="link"
                      onChange={(event) => this.changeState(event)}/><br/>
                    <button className="login-button" onClick={this.projectAdd}>Add</button>
                  </Container>
                }
              </Container>
            </div>
          </div>
        }
      </div>
    )
  }

}

const mapStateToProps = ({ githubStates }) => {
  return {
    admin: githubStates.admin,
    projects: githubStates.projects,
    users: githubStates.users,
    loading: githubStates.loading,
  }
};

export default connect(mapStateToProps, {
  adminSignOut,
  adminPostProjects
})(withRouter(Dashboard));
