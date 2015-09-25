import React, {PropTypes, Component} from 'react';
import {Spring} from 'react-motion';
import colors from '../theme/colors';

class Sidebar extends Component {

  render() {
    const {open} = this.props;
    const styles = {
      background: colors.bluegrey900,
      width: 250,
      paddingLeft: 50,
      overflow: 'hidden',
      zIndex: 1,
      borderWidth: open ? 1 : 0
    };

    return (
      <Spring endValue={{
        size: {val: open ? -50 : -250, config: [800, 40]}
      }}>
        {interpolation => {
          return (
            <div style={{...styles, marginLeft: `${interpolation.size.val}px`}}>
              {this.props.children}
            </div>
          );
        }}
      </Spring>
    );
  }

}

export default Sidebar;
