import React, {PropTypes, Component} from 'react';
import Select from 'react-select';
import Label from './Label';

class WrappedSelect extends Component {

  render() {
    const styles = {
      base: {}
    };

    return (
      <div style={styles.base}>
        {this.props.label ? <Label>{this.props.label}</Label> : null}
        <Select {...this.props} onChange={::this.handleChange}/>
      </div>
    );
  }

  handleChange(val, arrayVal) {
    val = this.props.multi ? arrayVal : val;
    this.props.onChange({[this.props.name]: val});
  }

}

WrappedSelect.defaultProps = {
  name: 'select',
  onChange: e => null
};

export default WrappedSelect;
