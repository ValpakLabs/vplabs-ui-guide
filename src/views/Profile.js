/* @flow */
import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {md5} from '../util';
import colors from '../theme/colors';
import Immutable from 'immutable';
import {createTransitionHook} from '../universalRouter';
import * as authActions from '../actions/authActions';
import * as userActions from '../actions/userActions';
import * as locationActions from '../actions/locationActions';
import colors, {getRgba} from '../theme/colors';
import ScrollView from './ScrollView';
import FlexRow from './FlexRow';
import Flex from './Flex';
import NotificationBanner from './NotificationBanner';
import Text from './Text';
import Icon from './Icon';
import Button from './Button';
import Input from './Input';
import Tabs from './Tabs';
import Tab from './Tab';
import Picture from './Picture';
import Box from './Box';
import Gravatar from './Gravatar';
import UserEditForm from './UserEditForm';
import Modal, {closeStyle} from 'simple-react-modal';
import moment from 'moment';

class Profile extends Component {
  state = {
    open: false
  }

  render() {
    const styles = {
      block: {
        height: 100,
        background: colors.lightblue500
      }
    };

    return (
      <UserEditForm
        user={this.props.user}
        errors={this.props.errors}
        onErrors={this.props.reportUserValidationErrors}
        onSave={this.props.saveAuthUser}
        onEdit={this.props.editAuthUser}
      />
    );
  }
}

Profile.fetchData = async (store) => {
  store.dispatch(authActions.loadAuth());
  store.dispatch(locationActions.loadLocation({displayName: ['Profile']}));
};

Profile.propTypes = {
  user: PropTypes.instanceOf(Immutable.Map).isRequired
};

Profile.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
};

export default connect(
  state => ({
    user: state.auth.get('user'),
    errors: state.users.get('errors')
  }),
  dispatch => bindActionCreators({...authActions, ...userActions}, dispatch)
)(Profile);
