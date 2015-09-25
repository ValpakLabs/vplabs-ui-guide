import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Link from './Link';
import * as pageActions from '../actions/pageActions';
import * as userActions from '../actions/userActions';
import * as locationActions from '../actions/locationActions';
import colors from '../theme/colors';
import {dataTableStyles} from './styles';
import ScrollView from './ScrollView';
import Icon from './Icon';
import FlexRow from './FlexRow';
import Flex from './Flex';
import Picture from './Picture';
import Text from './Text';
import Button from './Button';
import moment from 'moment';

@connect(
  state => ({
    me: state.auth.get('user'),
    pages: state.pages.get('all'),
    users: state.users.get('all'),
  }),
  dispatch => bindActionCreators({...locationActions, ...userActions, ...pageActions}, dispatch)
)
class Dashboard extends Component {

  static async fetchData(store, nextState) {
    try {
      await store.dispatch(locationActions.loadLocation({displayName: ['Dashboard']}));
      await store.dispatch(userActions.loadAllUsers());
      await store.dispatch(pageActions.loadAllPages());
    } catch (err) {
      throw err;
    }
  }

  componentWillMount() {
    this.props.loadLocation({displayName: ['Dashboard']});
    this.props.loadAllUsers();
    this.props.loadAllPages();
  }

  static contextTypes = {
    store: PropTypes.object
  }

  render() {
    const {me, users, pages} = this.props;

    return (
      <ScrollView>

          <FlexRow
            align='center'
            style={{
              padding: '40px 40px',
              background: colors['blue-grey-700']
            }}>
            <Text
              flex={1}
              color='#FFF'
              size='mega'
              weight='thin'>
              Hello, {me.get('fullname').split(' ')[0]}.
            </Text>

            <FlexRow justify='center' flex='none'>
              <FlexRow
                justify='center'
                dir='column'
                flex='none'
                style={{
                  color: '#FFF',
                  borderRadius: '50%',
                  background: colors['light-green-500'],
                  width: 240,
                  height: 240,
                  marginRight: 20
                }}>
                <Text
                  size='xxxmega'
                  lineHeight={1}
                  weight='thin'
                  align='center'>
                  {pages.size}
                </Text>
                <Link to='/pages'>
                  <Text
                    color='rgba(255,255,255,0.7)'
                    size='xxlarge'
                    align='center'>
                    Pages
                  </Text>
                </Link>
              </FlexRow>

              <FlexRow
                justify='center'
                dir='column'
                flex='none'
                style={{
                  color: '#FFF',
                  borderRadius: '50%',
                  background: colors['light-blue-500'],
                  width: 240,
                  height: 240
                }}>
                <Text
                  size='xxxmega'
                  lineHeight={1}
                  weight='thin'
                  align='center'>
                  {users.size}
                </Text>
                <Link to='/users'>
                  <Text
                    color='rgba(255,255,255,0.7)'
                    size='xxlarge'
                    align='center'>
                    Users
                  </Text>
                </Link>
              </FlexRow>
            </FlexRow>
          </FlexRow>

      </ScrollView>
    );
  }

}

export default Dashboard;
