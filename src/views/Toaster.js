import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as notificationActions from '../actions/notificationActions';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import {requireServerCss} from '../util';
import FlexRow from './FlexRow';
import Icon from './Icon';
import colors from '../theme/colors';

const styles = {
  base: {
    transform: 'translate3d(0,0,0)'
  },
  notificationWrapper: {
    background: 'rgba(0,0,0, 0.9)',
    color: '#FFF',
    width: 360,
    marginTop: 4,
    borderRadius: 3,
    fontSize: 14,
    fontWeight: 300,
    overflow: 'hidden',
    opacity: 0,
    maxHeight: 0,
    transition: 'all .3s ease-out'
  },
  notification: {
    padding: '16px 16px'
  },
  levelLabel: {
    margin: '0 8px 0 4px',
    fontWeight: 500,
    lineHeight: '24px',
    fontSize: 14,
    letterSpacing: '0.05em'
  }
};

class Toaster extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.notifications !== this.props.notifications;
  }

  // componentWillReceiveProps(nextProps) {
  //   console.log(nextProps.notifications.toJS())
  //   const notifications = nextProps.notifications.toJS();
  //   notifications.forEach((note, i) => this.showNotification(note.id));
  // }

  componentDidUpdate(prevProps) {
    const notifications = this.props.notifications.toJS();
    notifications.forEach((note, i) => this.showNotification(note.id));
  }
  

  showNotification(id) {
    const notification = ReactDOM.findDOMNode(this.refs.toaster).querySelector(`#notification-${id}`);
    if (!notification || notification.classList.contains('in'))
      return;

    this.timeout = setTimeout(() => {
      notification.classList.add('in');
      notification.style.opacity = 1;
      notification.style.maxHeight = '60px';
    }, 10);

    this.removeNotification(id);
  }

  removeNotification(id, delay = 3000) {
    this.timeout = setTimeout(() => {
      this.props.dismissNotification(id);
    }, delay);
  }

  render() {
    const notifications = this.props.notifications.toJS();
    if (notifications.length) {
      return (
        <div style={styles.base} ref='toaster'>

          {notifications.map((note, i) =>
            <div
              style={styles.notificationWrapper}
              key={note.id}
              data-index={i}
              data-uid={note.id}
              id={`notification-${note.id}`}
              onClick={::this.handleDismissNotification}>
              <div style={styles.notification}>
                <FlexRow justify='flex-start'>
                  <Icon
                    name={levelIcons[note.level.toLowerCase()]}
                    fill={levelColors[note.level.toLowerCase()]}
                    size={18}/>
                  <div style={{
                    ...styles.levelLabel,
                    color: levelColors[note.level.toLowerCase()]
                  }}>
                    {note.level}:
                  </div>
                  <div>{note.text}</div>
                </FlexRow>
              </div>
            </div>
          )}

        </div>
      );
    } else {
      return null;
    }
  }

  handleDismissNotification(e) {
    const uid = parseInt(e.currentTarget.dataset.uid);
    this.dismissNotification(uid);
  }

  dismissNotification(uid, delay = 300) {
    const elem = ReactDOM.findDOMNode(this.refs.toaster);
    if (!elem) return;
    const notification = elem.querySelector(`#notification-${uid}`);
    if (!notification) return;
    notification.style.opacity = 0;
    notification.style.maxHeight = 0;
    notification.style.marginTop = 0;
    setTimeout(() => {
      this.props.dismissNotification(uid);
    }, delay);
  }
}

Toaster.propTypes = {
  notifications: PropTypes.instanceOf(Immutable.List)
};

Toaster.defaultProps = {
  notifications: Immutable.List()
};

const levelColors = {
  success: colors['light-green-500'],
  info: colors['light-blue-400'],
  warn: colors['orange-400'],
  error: colors['red-500']
};

const levelIcons = {
  success: 'check',
  info: 'info_outline',
  warn: 'warning',
  error: 'error'
};

export default connect(
  state => ({notifications: state.notifications}),
  dispatch => bindActionCreators(notificationActions, dispatch)
)(Toaster);
