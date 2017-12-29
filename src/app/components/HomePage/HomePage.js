import React from 'react';

import styles from './HomePage.scss';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class HomePage extends React.Component {
  render() {
    return (
      <div className="container">
        {'This is the home page'}
      </div>
    );
  }
}

export default HomePage;
