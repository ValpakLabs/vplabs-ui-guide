import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import colors from '../theme/colors';

class LoadingBar extends Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  anim(timestamp) {
    if (this.firstPass) this.start = -1000;
    this.firstPass = false;
    if (!this.start) this.start = timestamp;
    let progress = timestamp - this.start;
    let loadingBar = this.loadingBar;
    if (Math.floor(progress) > 1000) {
      loadingBar.style.transition = 'none';
      loadingBar.style.transform = 'translateX(-100%)';
      setTimeout(() => {
        loadingBar.style.transition = 'all 1s cubic-bezier(0.445, 0.050, 0.550, 0.950)';
        loadingBar.style.transform = 'translateX(100%)';
      }, 0);
      this.start = null;
    }
    this.frame = window.requestAnimationFrame(::this.anim);
  }

  componentDidMount() {
    this.firstPass = true;
    this.start = null;
    this.loadingBar = ReactDOM.findDOMNode(this.refs.loadingBar);
    this.frame = window.requestAnimationFrame(::this.anim);
  }

  componentWillLeave(cb) {
    window.cancelAnimationFrame(this.frame);
    cb();
  }

  componentWillUnmount() {
    window.cancelAnimationFrame(this.frame);
  }

  render() {
    const styles = {
      base: {}
    };

    return (
      <div
        ref='loadingBar'
        style={{
          transition: 'all 1s cubic-bezier(0.445, 0.050, 0.550, 0.950)',
          transform: 'translateX(-100%)',
          zIndex: 9999,
          position: 'fixed',
          width: '100%',
          top: 0,
          height: 2,
          background: colors.indigo500
        }}/>
    );
  }

}

export default LoadingBar;
