import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Immutable from 'immutable';
import {createTransitionHook} from '../universalRouter';
import * as userActions from '../actions/userActions';
import * as locationActions from '../actions/locationActions';
import UserEditForm from './UserEditForm';

class UserEdit extends Component {

  componentWillMount() {
    let displayName;
    const {dispatch} = this.context.store;
    const {loadLocation} = locationActions;
    if (this.props.params.id) {
      this.props.loadUser(this.props.params.id).then(() => {
        dispatch(loadLocation({displayName: ['Users', this.props.user.get('fullname')]}));
      });
    } else {
      dispatch(loadLocation({displayName: ['User', 'Create']}));
    }
  }

  render() {
    return (
      <UserEditForm
        user={this.props.user}
        errors={this.props.errors}
        onErrors={this.props.reportUserValidationErrors}
        onSave={this.props.saveUser}
        onEdit={this.props.editUser}
      />
    );
  }
}

UserEdit.propTypes = {
  user: PropTypes.instanceOf(Immutable.Map).isRequired
};

UserEdit.contextTypes = {
  store: PropTypes.object.isRequired
};

export default connect(
  state => ({
    user: state.users.get('editing'),
    errors: state.users.get('errors')
  }),
  dispatch => bindActionCreators(userActions, dispatch)
)(UserEdit);
