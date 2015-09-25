import React, {Component, PropTypes} from 'react';

class Home extends Component {
  render() {
    const key = this.props.location.pathname;
    const {location} = this.props;

    return (
      <div>
        Home!
      </div>
    );
  }
}

export default Home;
