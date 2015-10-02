import React, {PropTypes, Component} from 'react';
import colors from '../theme/colors';

class Code extends Component {
  render() {
    const styles = {
      background: colors.white,
      borderRadius: 3,
      color: colors.grey900,
      padding: '1px 3px',
      border: `0px solid ${colors.grey300}`
    };

    return (
      <code style={styles}>{this.props.children}</code>
    );
  }
}

export default Code;
