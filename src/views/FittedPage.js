import React, {PropTypes, Component} from 'react';

class FittedPage extends Component {

  render() {
    return (
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: this.props.direction
      }}>
        {this.props.children}
      </div>
    );
  }

}

FittedPage.defaultProps = {
  direction: 'row'
}

export default FittedPage;
