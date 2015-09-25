import React, {PropTypes, Component} from 'react';
import {Link} from 'react-router';
import config from '../config';

class WrappedLink extends Component {

  render() {
    const styles = {
      base: {}
    };

    return (
      <Link {...this.props} to={config.appContext + this.props.to}>{this.props.children}</Link>
    );
  }

}

export default WrappedLink;