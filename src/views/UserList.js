/* @flow */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Link from './Link';
import {md5} from '../util';
import Immutable from 'immutable';
import * as userActions from '../actions/userActions';
import * as locationActions from '../actions/locationActions';
import colors from '../theme/colors';
import ScrollView from './ScrollView';
import DataTable, {Cell} from './DataTable';
import Icon from './Icon';
import FlexRow from './FlexRow';
import Flex from './Flex';
import Picture from './Picture';
import Text from './Text';
import Button from './Button';
import Gravatar from './Gravatar';
import moment from 'moment';

class UserList extends Component {

  componentWillMount() {
    this.context.store.dispatch(locationActions.loadLocation({displayName: ['Users']}));
    this.props.loadAllUsers();
  }

  render() {
    return (
      <ScrollView>
        <div style={{padding: '0 40px 100px 40px'}}>
          <FlexRow style={{padding: '20px 0'}}>
            <Text
              size='xxxlarge'
              weight='thin'
              color={colors.bluegrey800}>
              Users
            </Text>
            <Button
              style={{position: 'fixed', bottom: 40, right: 40}}
              icon='create'
              fab={true}
              fill={colors.red700}
              color='#FFF'
              onClick={e => this.props.createUser()}>
            </Button>
          </FlexRow>


          <DataTable
            columns={[
              {name: 'Username', flex: 1},
              {name: 'Full Name', width: 200},
              {name: 'Role', width: 120},
              {name: 'Created', width: 120}
            ]}
            items={this.props.users.get('all').toJS()}
            itemKey='_id'
            rowClassName='hover-container'
            rowCells={[
              <Cell renderfn={user =>
                <div style={{display: 'flex'}}>
                  <div style={{marginRight: 20}}>
                    <Gravatar size={60} email={user.email}/>
                  </div>

                  <FlexRow dir='column' align='flex-start'>
                    <Flex>
                      <Link to={`/users/${user._id}`}>
                        <Text weight='medium' size='large' color='darkblue'>{user.username}</Text>
                      </Link>
                      <Text size='small' lineHeight='18px' color='darkgrey'>{user.email}</Text>
                    </Flex>

                    <div className='show-on-hover' style={{marginTop: 10, lineHeight: 'normal'}}>
                      <Button size='tiny' icon='photo' color={colors.lightblue900} push='0 20px 0 0'>View</Button>
                      <Button size='tiny' icon='edit' color={colors.lightblue900} push='0 20px 0 0'>Edit</Button>
                      <Button onClick={::this.handleDeleteUserClick(user)} size='tiny' icon='delete' color={colors.red700}>Delete</Button>
                    </div>
                  </FlexRow>
                </div>
              }/>,
              <Cell renderfn={user =>
                 <Text size='small' color='darkgrey'>{user.fullname}</Text>
              }/>,
              <Cell renderfn={user =>
                <Text size='small' color='darkgrey'>{user.role}</Text>
              }/>,
              <Cell renderfn={user =>
                <Text size='small' color='darkgrey'>{moment(user.created).format('MM/DD/YY')}</Text>
              }/>
            ]}/>
        </div>
      </ScrollView>
    );
  }

  handleDeleteUserClick(user) {
    return () => {
      if (window.confirm('Are you sure you want to delete this user?')) {
        this.props.deleteUser(user._id);
      }
    };
  }

}

UserList.propTypes = {
  users: PropTypes.instanceOf(Immutable.Map).isRequired
};

UserList.contextTypes = {
  store: PropTypes.object
};

export default connect(
  state => ({users: state.users}),
  dispatch => bindActionCreators(userActions, dispatch)
)(UserList);
