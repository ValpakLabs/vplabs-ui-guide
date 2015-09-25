import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toggleSidebar} from '../actions/uiActions';
import colors from '../theme/colors';
import Sidebar from './Sidebar';

require('./App.scss');

const styles = {
  base: {
    perspective: 900,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: colors.grey100,
    display: 'flex',
    width: '100%'
  },
  body: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    zIndex: 999,
    boxShadow: '-1px 0px 4px rgba(0,0,0,0.2)'
  },
  mainContent: {
    display: 'flex',
    width: '100%',
    flex: 1,
    overflow: 'hidden'
  }
};

class App extends Component {

  render() {
    const {sidebar, toggleSidebar} = this.props;

    return (
      <div style={styles.base}>

        <Sidebar open={sidebar.get('open')}/>

        <div style={styles.body}>
          <div style={styles.mainContent}>
            {this.props.children}
          </div>
        </div>

      </div>
    );
  }

  handleScroll() {
    clearTimeout(this.timer);
    if (!document.body.classList.contains('nohover')) {
      document.body.classList.add('nohover');
    }
    this.timer = setTimeout(() => {
      document.body.classList.remove('nohover');
    }, 500);
  }

}

export default connect(
  state => ({sidebar: state.ui.get('sidebar')}),
  dispatch => bindActionCreators({toggleSidebar}, dispatch)
)(App);
