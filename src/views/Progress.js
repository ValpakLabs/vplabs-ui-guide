import React, {PropTypes, Component} from 'react';
import colors from '../theme/colors';

class Progress extends Component {

  static propTypes = {

  }

  static defaultProps = {
    progress: 0
  }

  render() {
    const {progress} = this.props;

    const styles = {
      base: {
        width: '100%',
        height: '100%'
      },
      inner: {
        transition: 'all .1s',
        width: this.props.failed ? '100%' : `${progress * 100}%`,
        height: '100%',
        background: this.props.failed ?
          colors['red-500'] :
          colors[progress >= 1 ? 'light-green-500' : 'blue-500']
      }
    };

    return (
      <div style={styles.base}>
        <div style={styles.inner}></div>
      </div>
    );
  }

}

export default Progress;
