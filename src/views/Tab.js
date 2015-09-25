import React, {PropTypes, Component} from 'react';
import colors from '../theme/colors';

class Tab extends Component {

  static propTypes = {

  }

  static defaultProps = {
    tabColor: colors['blue-grey-800'],
    underlineColor: colors['orange-600']
  }

  render() {
    const {selected} = this.props;

    const styles = {
      base: {
        color: this.props.darkTheme ? 'white' : this.props.tabColor,
        textTransform: 'uppercase',
        fontSize: 13,
        fontWeight: selected ? 400 : 300,
        letterSpacing: '0.09em',
        flex: 1,
        textAlign: 'center',
        cursor: 'default',
        opacity: selected ? 1 : 0.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        borderTop: '3px solid rgba(0,0,0,0.0)',
        borderBottom: '3px solid rgba(0,0,0,0.0)',
        borderBottomColor: selected ? this.props.underlineColor : 'rgba(0,0,0,0.0)'
      }
    };

    return (
      <div style={{...styles.base, ...this.props.tabStyle}} onClick={::this.handleTouchTap} routeName={this.props.route}>
        {this.props.label}
      </div>
    );
  }

  handleTouchTap() {
    this.props.handleTouchTap(this.props.tabIndex, this);
  }

}

export default Tab;
