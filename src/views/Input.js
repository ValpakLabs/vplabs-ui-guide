import React from 'react';
import colors from '../theme/colors';
import {requireServerCss, getObjectForKeys} from '../util';
import Icon from './Icon';
import Label from './Label';

class Input extends React.Component {
  static defaultProps = {
    size: 'normal',
    fill: '#FFF',
    icon: null,
    color: '#000000',
    placeholder: 'Enter text',
    name: '',
    value: '',
    block: false,
    label: null,
    type: 'text',
    multiple: false,
    disabled: false,
    readOnly: false,
    push: 0,
    flex: 'none',
    error: null,
    borderColor: colors.grey300,
    onChange: function() {}
  };

  render() {
    const {
      push,
      width,
      fill,
      color,
      icon,
      placeholder,
      name,
      value,
      block,
      label,
      type,
      multiple,
      flex,
      borderColor,
      disabled,
      error,
      size
    } = this.props;

    const style = {
      base: {
        margin: push,
        width: width,
        flex: flex,
        position: 'relative'
      },
      input: {
        background: fill,
        padding: icon ? '4px 8px 4px 42px' : size === 'large' ? '4px 12px' : '4px 8px',
        fontSize: size === 'large' ? 22 : 14,
        lineHeight: size === 'large' ? '48px' : '30px',
        borderColor,
        color
      },
      icon: {
        position: 'absolute',
        top: '50%',
        left: 10,
        transform: 'translateY(-50%)',
        opacity: 0.2
      },
      fileBase: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0
      },
      fileInput: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0
      },
      error: {
        fontSize: 11,
        background: colors.red700,
        color: '#FFF',
        padding: '3px 12px',
        marginTop: 2,
        borderRadius: 3
      }
    };

    return (
      <div style={type === 'file' ? {...style.fileBase} : {...style.base}}>
        {label ? <Label>{label}</Label> : null}
        <div style={{position: 'relative'}}>
          <input
            readOnly={this.props.readOnly}
            disabled={disabled}
            multiple={multiple}
            type={type}
            style={type === 'file' ? style.fileInput : style.input}
            className='Input'
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={::this.handleChange}/>
          {icon && <Icon style={style.icon} fill={color} name={icon}/>}
        </div>

        {error ? <div style={style.error}>{error.error}</div> : null}

      </div>
    );
  }

  handleChange(e) {
    if (this.props.type === 'file')
      return this.props.onChange(e.target.files);

    let change = getObjectForKeys(
      e.target.name.split('.'),
      e.target.value
    );
    this.props.onChange(change);
  }

}

export default Input;
