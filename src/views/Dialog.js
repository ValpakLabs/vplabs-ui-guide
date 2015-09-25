import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import Color from 'color';
import colors from '../theme/colors';
import Icon from './Icon';
import Button from './Button';
import FlexRow from './FlexRow';

class Dialog extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      active: false,
      promise: null
    };
    this.show = this.show.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.active && !prevState.active) {
      setTimeout(() => {
        ReactDOM.findDOMNode(this.refs.base).style.opacity = 1;
        ReactDOM.findDOMNode(this.refs.inner).style.opacity = 1;
        ReactDOM.findDOMNode(this.refs.inner).style.transform = 'scale(1)';
      });
    } else if (this.state.isLeaving) {
      ReactDOM.findDOMNode(this.refs.base).style.opacity = 0;
      ReactDOM.findDOMNode(this.refs.inner).style.opacity = 0;
      ReactDOM.findDOMNode(this.refs.inner).style.transform = 'scale(0.5)';
    }
  }

  render() {
    const styles = {
      base: {
        transition: `all .1s ${this.state.isLeaving ? '0s' : '0s'} ease-in`,
        opacity: 0,
        zIndex: 9,
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        // background: Color(colors.bluegrey).clearer(0.8).rgbaString(),
        display: this.state.active ? 'flex' : 'none',
        justifyContent: 'center',
        alignItems: 'flex-start',
      },
      inner: {
        color: '#FFF',
        minWidth: '30vw',
        maxWidth: '50vw',
        marginTop: '15vh',
        opacity: 0,
        transition: `all .1s ${this.state.isLeaving ? '0s' : '0s'} cubic-bezier(0.445, 0.050, 0.550, 0.950)`,
        transform: 'scale(0.5)',
        background: colors.bluegrey900,
        borderRadius: 3,
        boxShadow: '0px 15px 25px rgba(0,0,0,0.2)'
      },
      content: {
        padding: '40px 20px 60px 20px',
        fontWeight: 300
      },
      footer: {

      }
    };

    return (
      <div ref='base' style={styles.base} onKeyUp={::this.handleKeyUp} tabIndex='0'>

        <div ref='inner' style={styles.inner}>
          <div style={styles.content}>
            {this.state.children}
          </div>

          <FlexRow justify='flex-end' style={styles.footer}>
            <Button
              color={this.props.cancelColor}
              nohover={true}
              onClick={::this.handleCancelClick}>
              {this.props.cancelText}
            </Button>
            <Button
              color={this.props.confirmColor}
              nohover={true}
              onClick={::this.handleConfirmClick}>
              {this.props.confirmText}
            </Button>
          </FlexRow>
        </div>

      </div>
    );
  }

  handleConfirmClick(resolve) {}
  handleCancelClick(reject) {}

  show(data) {
    this.setState({children: this.props.content ? this.props.content(data) : this.props.children});
    const promise = new Promise((resolve, reject) => {
      this.setState({active: true}, () => {
        ReactDOM.findDOMNode(this.refs.base).focus();
      });
      this.handleConfirmClick = () => {
        resolve();
        this.setState({isLeaving: true});
        setTimeout(() => {
          this.setState({active: false, isLeaving: false});
        }, 500);
      };
      this.handleCancelClick = () => {
        reject();
        this.setState({isLeaving: true});
        setTimeout(() => {
          this.setState({active: false, isLeaving: false});
        }, 500);
      };
    });
    return promise;
  }

  handleKeyUp(e) {
    if (e.keyCode === 27)
      this.handleCancelClick();
  }

}

Dialog.defaultProps = {
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  confirmColor: colors.bluegrey800,
  cancelColor: colors.bluegrey400
};

export default Dialog;
