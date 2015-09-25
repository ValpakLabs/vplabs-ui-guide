import React, {PropTypes, Component} from 'react';
import colors from '../theme/colors';
import Icon from './Icon';
import * as locationActions from '../actions/locationActions';

class ErrorPage extends Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  static contextTypes = {
    router: PropTypes.object.isRequired,
    store: PropTypes.object.isRequired
  };

  render() {
    const styles = {
      base: {
        background: colors['red-500'],
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
      },
      text: {
        color: '#FFF',
        fontWeight: 900,
        // textTransform: 'uppercase',
        fontSize: 80,
        letterSpacing: '-0.03em',
        lineHeight: '120px'
      },
      icon: {
        color: colors['red-800'],
        fontSize: 200
      }
    };

    return (
      <div style={styles.base}>
        <Icon style={styles.icon} name='info_outline'/>
        <div style={styles.text}>not found</div>
      </div>
    );
  }

}

ErrorPage.fetchData = async (store) => {
  store.dispatch(locationActions.loadLocation({displayName: ['Error!']}));
};

export default ErrorPage;
