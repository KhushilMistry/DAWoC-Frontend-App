import React, {Component} from 'react';

import styles from './Loader.scss';
import withStyles from '../../decorators/withStyles';


@withStyles(styles)
class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="loader" />
    );
  }
}


export default Loader;

