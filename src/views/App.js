import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {toggleAppSidebar} from '../actions/uiActions';
import {Link} from 'react-router';
import colors from '../theme/colors';
import Menu from './Menu';
import Text from './Text';
import FlexBox from './FlexBox';
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
      <FlexBox align='stretch' flex={1}>

        <Sidebar open={sidebar.get('open')}>
          <Header bgcolor={colors.lightblue500} color={colors.white}>
            <Text size='large'><Link to='/'>ValpakLabs UI</Link></Text>
          </Header>

          <Menu itemColor={colors.white} style={{marginTop: 8}}>
            <Text push='12px 0 0 0' size='small' color={colors.bluegrey500} transform='uppercase'>Layout</Text>
            <Link to='/scrollview'>ScrollView</Link>
            <Link to='/flexbox'>Flexbox</Link>
            <Link to='/flex'>Flex</Link>
            <Text push='12px 0 0 0' size='small' color={colors.bluegrey500} transform='uppercase'>Interaction</Text>
            <Link to='/buttons'>Buttons</Link>
            <Link to='/forms'>Forms</Link>
            <Link to='/flyout'>Flyout</Link>
            <Link to='/tabs'>Tabs</Link>
            <Text push='12px 0 0 0' size='small' color={colors.bluegrey500} transform='uppercase'>Typography</Text>
            <Link to='/text'>Text</Link>
          </Menu>
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

      </FlexBox>
    );
  }
}

export default connect(
  state => ({sidebar: state.ui.get('sidebar')}),
  dispatch => bindActionCreators({toggleAppSidebar}, dispatch)
)(App);
