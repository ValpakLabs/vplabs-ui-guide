import React, {PropTypes, Component} from 'react';
import colors from '../theme/colors';
import ScrollView from './ScrollView';
import FlexRow from './FlexRow';
import Flex from './Flex';
import Text from './Text';
import Icon from './Icon';
import Button from './Button';
import Input from './Input';
import Picture from './Picture';
import Gravatar from './Gravatar';
import Select from './Select';

class UserEditForm extends Component {

  static propTypes = {

  }

  static defaultProps = {

  }

  componentDidMount() {
    this.props.onErrors({}); // <- clear errors
  }

  render() {
      let {user, errors} = this.props;

      const roleOptions = [
          { value: 'admin', label: 'Admin' },
          { value: 'author', label: 'Author' },
          { value: 'publisher', label: 'Publisher' }
      ];

      return (
        <ScrollView>
          <div style={{padding: 40}}>

            <FlexRow justify='center' align='flex-start'>
              <div style={{marginRight: 40}}>
                <Gravatar size={180} email={user.get('email')}/>
              </div>

              <div style={{width: 400}}>

                <Input
                  placeholder='Give them a Username'
                  name='username'
                  value={user.get('username')}
                  label='Username'
                  onChange={change => this.props.onEdit(change)}/>
                <br />
                <Input
                  placeholder={'Add their full name'}
                  name='fullname'
                  value={user.get('fullname')}
                  label='Full Name'
                  onChange={change => this.props.onEdit(change)}/>
                <br />
                <Input
                  placeholder='Add their email address'
                  name='email'
                  value={user.get('email')}
                  label='Email'
                  onChange={change => this.props.onEdit(change)}/>
                <br />

                <Select
                    label='User Role'
                    disabled={user.get('forceAdmin')}
                    name='role'
                    value={user.get('role')}
                    options={roleOptions}
                    onChange={::this.props.onEdit}/>
                <br />
                <Input
                  error={errors.toJS().password}
                  placeholder='Must be 6 or more characters'
                  name='password'
                  value={user.get('password')}
                  label='Password'
                  onChange={change => this.props.onEdit(change)}/>
                <br/>
                <Input
                  placeholder='Must be 6 or more characters'
                  name='confirmpassword'
                  value={user.get('confirmpassword')}
                  label='Confirm Password'
                  onChange={change => this.props.onEdit(change)}/>
                <br/>
                <div style={{marginTop: 40}}>
                  <Button
                    onClick={::this.handleSaveClick}
                    color={colors.lightgreen600}>
                    Save
                  </Button>
                </div>

              </div>
            </FlexRow>

          </div>
        </ScrollView>
      );
    }

    validate() {
      const {user} = this.props;
      let errors = {};

      if (user.get('password') && user.get('password') !== user.get('confirmpassword'))
        errors.password = {error: 'Passwords do not match'};

      if (user.get('password') && user.get('password').length < 6)
        errors.password = {error: 'Password must be 6 or more characters'};

      return errors;
    }

    handleSaveClick() {
      const {user} = this.props;
      const errors = this.validate();

      if (Object.keys(errors).length)
        this.props.onErrors(errors);
      else
        this.props.onSave(user.toJS());
    }

}

export default UserEditForm;
