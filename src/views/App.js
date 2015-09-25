import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toggleAppSidebar} from '../actions/uiActions';
import colors from '../theme/colors';
import FlexRow from './FlexRow';
import FlexColumn from './FlexColumn';
import Flex from './Flex';
import Header from './Header';
import Sidebar from './Sidebar';
import Button from './Button';

require('./App.scss');

class App extends Component {
  render() {
    const {sidebar, toggleAppSidebar} = this.props;
    return (
      <FlexRow align='stretch'>

        <Sidebar open={sidebar.get('open')}>
          {/* nav links*/}
        </Sidebar>

        <FlexColumn align='stretch'>
          <Header>
            <Button icon='menu' onClick={toggleAppSidebar}/>
            Current Location Here!
          </Header>

          <Flex>
            {this.props.children}
          </Flex>
        </FlexColumn>

      </FlexRow>
    );
  }
}

export default connect(
  state => ({sidebar: state.ui.get('sidebar')}),
  dispatch => bindActionCreators({toggleAppSidebar}, dispatch)
)(App);
