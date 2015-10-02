import React, {PropTypes, Component} from 'react';
import colors from '../theme/colors';

export class Table extends Component {

  render() {
    const styles = {
      display: 'table',
      width: '100%',
      ...this.props.style
    };

    return (
      <div style={styles}>{this.props.children}</div>
    );
  }

}

export class Row extends Component {

  render() {
    const styles = {
      display: 'table-row',
      ...this.props.style
    };

    return (
      <div style={styles}>{this.props.children}</div>
    );
  }

}

export class Cell extends Component {

  render() {
    const styles = {
      display: 'table-cell',
      padding: '18px 20px 18px 0',
      borderBottom: `1px solid ${colors.grey300}`,
      width: this.props.width || 'auto',
      ...this.props.style
    };

    return (
      <div style={styles}>{this.props.children}</div>
    );
  }

}
