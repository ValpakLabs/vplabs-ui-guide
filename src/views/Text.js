import React from 'react';
import cx from 'classnames';
import colors from '../theme/colors';

const sizes = {
  tiny: 10,
  small: 12,
  normal: 14,
  large: 16,
  xlarge: 20,
  xxlarge: 26,
  xxxlarge: 32,
  mega: 36,
  xmega: 42,
  xxmega: 48,
  xxxmega: 60
};

const weights = {
  thin: 100,
  light: 300,
  normal: 400,
  medium: 500,
  bold: 700,
  ultra: 900
};

const pallete = {
  default: 'inherit',
  lightgrey: colors['blue-grey-500'],
  darkgrey: colors['blue-grey-800'],
  darkblue: colors['light-blue-900']
};

class Text extends React.Component {
  static defaultProps = {
    weight: 'normal',
    size: 'normal',
    transform: 'none',
    color: 'default',
    letterSpacing: '0.0em',
    push: 0,
    italic: false,
    display: 'block',
    flexAlign: null,
    flex: 'none',
    width: 'auto',
    height: 'auto',
    lineHeight: '1.5em',
    align: 'left'
  };

  render() {
    const {
      cursor,
      size,
      weight,
      width,
      height,
      transform,
      color,
      letterSpacing,
      push,
      italic,
      display,
      flexAlign,
      flex,
      lineHeight,
      align
    } = this.props;

    const style = {
      fontWeight: weights[weight],
      fontSize: sizes[size],
      textTransform: transform,
      textAlign: align,
      margin: push,
      color: pallete[color] ? pallete[color] : color,
      fontStyle: italic ? 'italic' : 'normal',
      display: flexAlign ? 'flex' : display,
      alignItems: flexAlign,
      cursor,
      lineHeight,
      width,
      height,
      flex,
      letterSpacing
    };

    return (
      <div key={this.props.key} onClick={::this.handleClick} style={{...style, ...this.props.style}}>{this.props.children}</div>
    );
  }

  handleClick() {
    if (typeof this.props.onClick === 'function')
      this.props.onClick();
  }
}

export default Text;
