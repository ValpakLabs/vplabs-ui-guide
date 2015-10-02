import React, {Component, PropTypes} from 'react';
import colors from '../theme/colors';

class Header extends React.Component {
  static defaultProps = {
    bgcolor: '#FFF',
    color: colors.bluegrey900,
    fixed: false,
    raised: true
  };

  render() {
    const {bgcolor, color, fixed, raised} = this.props;

    const style = {
      minHeight: 64,
      padding: '0 12px',
      display: 'flex',
      alignItems: 'center',
      zIndex: 1,
      position: fixed ? 'absolute' : 'relative',
      background: bgcolor,
      color: color,
      boxShadow: raised ? '0px 1px 5px rgba(0,0,0,0.3)' : 'none'
    };

    return (
      <div style={{...style, ...this.props.style}}>{this.props.children}</div>
    );
  }

}

export default Header;
