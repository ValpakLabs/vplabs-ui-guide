import React, {PropTypes, Component} from 'react';
import colors from '../theme/colors';

class Label extends Component {

  render() {
    const styles = {
      base: {
        color: this.props.color,
        fontSize: 14,
        lineHeight: '24px',
        fontWeight: 500,
        marginBottom: 4,
        display: 'inline-block',
        width: this.props.width
      }
    };

    return (
      <div style={{...styles.base, ...this.props.style}}>{this.props.children}</div>
    );
  }

}

Label.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  color: PropTypes.string
};

Label.defaultProps = {
  width: 'auto',
  color: colors.grey600
};

export default Label;
