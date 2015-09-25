import React, {PropTypes, Component} from 'react';
import Text from './Text';
import colors from '../theme/colors';

class Switch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      on: this.props.value
    };
  }

  render() {
    const {maxWidth, width, height, size, activeColor, inactiveColor, justify, labelFirst} = this.props;

    const styles = {
      base: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: justify ? 'space-between' : 'flex-start',
        maxWidth,
        height,
        width
      },
      wrapper: {
        position: 'relative',
        marginRight: labelFirst ? 0 : 20,
        order: labelFirst ? 2 : 0
      },
      bg: {
        position: 'relative',
        zIndex: 1,
        width: size * 2,
        height: size,
        borderRadius: 3,
        background: this.state.on ? activeColor : inactiveColor,
        transition: 'background .1s ease-out'
      },
      button: {
        zIndex: 2,
        borderRadius: 3,
        boxShadow: `${this.state.on ? '-2px' : '2px'} 0px 2px rgba(0,0,0, 0.2)`,
        background: '#FFF',
        height: size - 4,
        width: size - 4,
        position: 'absolute',
        left: 2,
        top:  2,
        transition: 'transform .1s ease-out',
        transform: `translateX(${this.state.on ? size + 'px' : 0})`
      }
    };

    return (
      <div style={{...styles.base, ...this.props.style}} onClick={::this.toggle}>

        <div style={styles.wrapper}>
          <div style={styles.bg}></div>
          <div style={styles.button}></div>
        </div>

        {this.props.label ? <Text weight='medium' color={colors['grey-500']}>{this.props.label}</Text> : null}

      </div>
    );
  }

  toggle() {
    const nextState = !this.state.on;
    this.setState({on: nextState});
    if (typeof this.props.onChange === 'function')
      this.props.onChange({[this.props.name]: nextState});
  }

}

Switch.defaultProps = {
  labelFirst: true,
  maxWidth: '100%',
  label: undefined,
  value: false,
  width: '100%',
  height: 40,
  size: 24,
  activeColor: colors['light-green-500'],
  inactiveColor: 'rgba(0,0,0, 0.2)',
  justify: true
};

export default Switch;
