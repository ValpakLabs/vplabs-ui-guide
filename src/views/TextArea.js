import React from 'react';
import colors from '../theme/colors';
import {requireServerCss, getObjectForKeys} from '../util';
import Icon from './Icon';
import Label from './Label';

class Input extends React.Component {
  static defaultProps = {
    fill: 'transparent',
    icon: null,
    color: '#000000',
    placeholder: 'Enter text',
    name: '',
    value: '',
    block: true,
    label: null,
    rows: 3,
    push: 0,
    onChange: function() {},
  };

  render() {
    const {
      fill,
      color,
      icon,
      placeholder,
      name,
      value,
      block,
      rows,
      label,
      push
    } = this.props;

    const style = {
      base: {
        margin: push
      },
      input: {
        display: block ? 'block' : 'inline-block'
      }
    };

    return (
      <div style={style.base}>
        {label ? <Label>{label}</Label> : null}
        <textarea
          style={style.input}
          rows={rows}
          className='Input TextArea'
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={::this.handleChange}/>
      </div>
    );
  }

  handleChange(e) {
    let change = getObjectForKeys(
      e.target.name.split('.'),
      e.target.value
    );
    this.props.onChange(change);
  }

}

export default Input;
