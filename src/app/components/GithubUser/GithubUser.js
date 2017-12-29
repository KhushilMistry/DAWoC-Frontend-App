import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router';

import styles from './GithubUser.scss';
import withStyles from '../../decorators/withStyles';
import {githubLogOut} from '../../../../actions/githubActions';
import Loader from '../Loader';
import {Row, Col, Container} from 'react-grid-system';

@withStyles(styles)
class GithubUser extends React.Component {
  constructor(props) {
    super(props);
  }


  logout = () => {
    this.props.githubLogOut();
  }

  render() {
    if (this.props.admin === true) {
      this.props.router.push('/dawoc_admin');
    }
    return (
      <div>
        { this.props.loading ?
          <Loader /> :
          <div>
            <div className="githubUser">
              <div>
                <a href="http://woc.daiict.ac.in/" target="_blank">
                  <div className="coverLogo">
                  </div>
                </a>
                <div className="navbarLinks">
                  <div>
                    <a href="#githubProjects">Projects</a>
                  </div>
                  <div>
                    <a href="#githubContribution">What you need to know</a>
                  </div>
                  <div onClick={this.logout}>
                    <a href="#">Log Out</a>
                  </div>
                </div>
              </div>
              <div className="userCover">
                <div className="userContent">
                  <div className="githubHeading">{'DAWoC'}</div>
                  <div className="smallHeading">{'DA-IICT Winter of Code'}</div>
                  <div
                    className="normalHeading">{'Welcome,' + this.props.user.name + ' start contributing here and earn some goodies!'}</div>
                </div>
              </div>
            </div>
            <div className="githubContribution">
              <Container>
                <p className="heading2">{'Your Contribution'}</p>
                <Row className="paddingTop">
                  <Col className="userInfo">
                    <img src={this.props.user.image} className="userLogo"/>
                    <p className="githubUserName">{this.props.user.username}</p>
                    <p className="githubName">{'@'}{this.props.user.name}</p>
                  </Col>
                  <Col>
                    <div className="githubContributionText">
                      <p>Start contributing from <br /><b>6th January,2018</b></p>
                    </div>
                  </Col>
                </Row>
              </Container>
            </div>
            <div className="githubProjects" id="githubProjects">
              <p className="heading2">{'Projects'}</p>
              <Container>
                {this.props.projects.map((project, index) => {
                  return <div className="githubProjectCard">
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
                      {'Author : '+ project.mentor}
                    </div>
                  </div>
                })}
              </Container>
            </div>
            <div className="githubContribution" id="githubContribution">
              <Container>
                <p className="heading2">{'What you need to know'}</p>
                <p className="githubContributionDesc">
                  DAWoC is an initiative by Google Developer Student Club DA-IICT exclusively for students of DA-IICT
                  who are new to open source software development to get started with open source contributions. <br />

                  All​ of​ the​ work is going​ to​ be​ on​​ Github​,​ a​ website​ which​ is​ used​ for​ source code​ ​
                  hosting and​ collaborative software​ development.​​ DAWoC​ is​ modelled to​ be​ similar​ ​ to but​
                  smaller​ in scope than Google​ Summer of​ Code​ (GSoC). GSoC​ is​ a​ global​ program that​​ matches
                  students up with​ open​ source,​ free software​ and​ technology-related​​ organizations​ to​ write​
                  code​ and​ get​ paid for the same. <br />

                  Similarly, DAWoC is aimed at introducing new students in the area. Registered students will have to
                  choose one or more project from the project list, which will be released by 4th January.<br />

                  Every project​ list​ will have at​ least one mentor. Students​ will​ then have to​ contact the​
                  mentor​ who​ shall​ be​ guiding​ them​ on​ the​ project.
                  <br />
                  <br />
                  <a className="moreButton"
                    href="https://docs.google.com/document/d/e/2PACX-1vQrZ9VwNxyoAg7APJgsfju2rZtcihGObwEZmb6kDul8Hof1MdOgSTioYAN7ustFRcm5YwZ0N4Jy-Dh4/pub"
                    target="_blank">
                    Manual
                  </a>
                </p>
              </Container>
            </div>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = ({ githubStates }) => {
  return {
    user: githubStates.user,
    token: githubStates.token,
    loading: githubStates.loading,
    projects: githubStates.projects
  }
};

export default connect(mapStateToProps, {
  githubLogOut
})(withRouter(GithubUser));

