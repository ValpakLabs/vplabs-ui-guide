import React from 'react';
import cx from 'classnames';
import colors from '../theme/colors';
import {requireServerCss} from '../util';
import {getButtonStyles} from './styles';
import Icon from './Icon';

class Button extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      hover: false,
      active: false
    };
  }

  static defaultProps = {
    fill: 'transparent',
    icon: null,
    color: '#000000',
    flex: 'none',
    disabled: false,
    push: 0,
    size: 'normal',
    fab: false,
    shadow: true,
    width: null,
    height: null,
    outline: false,
    preset: null,
    onClick: function() {}
  }

  render() {
    const {disabled, children, icon, size, color, fab} = this.props;

    const styles = getButtonStyles(this.props);

    const baseStyles = {
      ...styles.base,
      ...styles.modifiers[this.state.hover ? 'hover' : null],
      ...styles.modifiers[this.state.active ? 'active' : null],
      ...styles.modifiers[this.state.focus ? 'focus' : null],
      ...this.props.style
    };

    return (
      <button
        className={this.props.showOnHover ? 'show-on-hover' : ''}
        style={baseStyles}
        disabled={disabled}
        onMouseEnter={::this.mouseEnter}
        onMouseLeave={::this.mouseLeave}
        onMouseDown={::this.mouseDown}
        onMouseUp={::this.mouseUp}
        onFocus={::this.onFocus}
        onBlur={::this.onBlur}
        onClick={::this.handleClick}>

        <div style={styles.inner}>
          {icon ?
            <div style={styles.icon}>
              <Icon name={icon} size={size === 'tiny' ? fab ? 24 : 16 : 24}/>
            </div>
          : null}
          {children ? <div style={styles.text}>{children}</div> : null}
        </div>

      </button>
    );
  }

  handleClick(e) {
    if (this.props.disabled) return;
    this.props.onClick(e);
  }

  mouseEnter() {
    if (this.props.nohover) return;
    this.setState({hover: true});
  }

  mouseLeave() {
    if (this.props.nohover) return;
    this.setState({
      hover: false,
      active: false
    });
  }

  mouseDown() {
    this.setState({active: true});
  }

  mouseUp() {
    this.setState({active: false});
  }

  onFocus() {
    this.setState({focus: true});
  }

  onBlur() {
    this.setState({focus: false});
  }

}

export default Button;
