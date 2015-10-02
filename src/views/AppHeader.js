import React from 'react';
import {connect} from 'react-redux';
import {logout} from '../actions/authActions';
import TimeoutTransitionGroup from './TimeoutTransitionGroup';
import Link from './Link';
import Header from './Header';
import Icon from './Icon';
import FlexBox from './FlexBox';
import Button from './Button';
import Text from './Text';
import Gravatar from './Gravatar';
import Flyout from './Flyout';
import Flex from './Flex';
import colors from '../theme/colors';

class AppHeader extends React.Component {
  static propTypes = {
    user: React.PropTypes.object
  }

  static contextTypes = {
    store: React.PropTypes.object.isRequired
  };

  shouldComponentUpdate(nextProps) {
    return this.props.location !== nextProps.location ||
           this.props.user !== nextProps.user ||
           this.props.sidebarIsOpen !== nextProps.sidebarIsOpen;
  }

  render() {
    const {user, location} = this.props;

    return (
      <Header color={colors.bluegrey900} bgcolor={`#FFF`} style={{zIndex: 3}}>

        <div style={{flex: 1, margin: '0 0px', transform: 'translate3d(0,0,0)'}}>

          <FlexBox justify='flex-start' align='stretch'>
            <div style={{
              marginRight: this.props.sidebarIsOpen ? 48 : 20,
              marginLeft: this.props.sidebarIsOpen ? -60 : 8,
              transition: 'margin .15s ease-out'}}>
              <Button
                fill={this.props.sidebarIsOpen ? 'transparent' : 'transparent'}
                size='tiny'
                nohover={true}
                outline={this.props.sidebarIsOpen ? false : true}
                fab={true}
                shadow={false}
                icon='menu'
                color={this.props.sidebarIsOpen ? colors.bluegrey900 : colors.bluegrey900}
                onClick={::this.handleMenuClick}></Button>
            </div>

            <div style={{position: 'relative', flex: 1}}>
              <TimeoutTransitionGroup enterTimeout={1000} leaveTimeout={1000} component='div' transitionName='slideout' style={{}}>
                <div
                  key={location.get('displayName')}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    top: '50%',
                  }}>

                  <FlexBox justify='flex-start' style={{transform: 'translateY(-50%)'}}>
                    {location.get('displayName').map((branch, i) =>
                      <FlexBox justify='flex-start' flex='none' key={i}>
                        {i !== 0 ? <Icon name='chevron_right' fill={colors.bluegrey200} pushRight={5} size={18} pushLeft={5}/> : null}
                        <Text
                          color={colors.bluegrey900}
                          size='xlarge'
                          weight='thin'>
                          {branch}
                        </Text>
                      </FlexBox>
                    )}
                  </FlexBox>

                </div>
              </TimeoutTransitionGroup>
            </div>
          </FlexBox>

        </div>

        {user.get('isLoggedIn') ?
          <FlexBox
            id='flyout-trigger_userAvatar'
            justify='flex-start'
            flex='none'
            style={{
              cursor: 'pointer',
              marginRight: 8,
              borderRadius: 20,
              border: `1px solid ${colors.bluegrey100}`
            }}
            onClick={e => this.refs.flyout_userAvatar.show()}>
            <Gravatar size={40} email={user.get('email')} style={{cursor: 'pointer', marginRight: 8, padding: 2}} />
            <Text
              style={{cursor: 'pointer', marginRight: 16}}
              size='small'
              color={colors.bluegrey800}
              weight='medium'>
              {user.get('fullname')}
            </Text>
          </FlexBox> :
          <Link to='/login'>
            <Button icon='face' color='rgba(0,0,0,0.54)'>Login</Button>
          </Link>}

        <Flyout offset={1} bgcolor={colors.bluegrey900} padding={0} closeOnClick={true} width={160} position='below' ref='flyout_userAvatar' target='flyout-trigger_userAvatar'>
          <Link to='/profile'>
            <Text
              push='25px 20px 20px 20px'
              flexAlign='center'
              size='small'
              letterSpacing='0.09em'
              transform='uppercase'
              weight='normal'
              color={colors.bluegrey50}>
              <Icon name='face' fill={colors.bluegrey500} size={18} pushRight={10}/> Profile
            </Text>
          </Link>
          <Text
            push='0 20px 25px 20px'
            cursor='pointer'
            flexAlign='center'
            size='small'
            letterSpacing='0.09em'
            transform='uppercase'
            weight='normal'
            color={colors.bluegrey50}
            onClick={e => this.props.dispatch(logout(this.context.router))}>
            <Icon name='power_settings_new' fill={colors.bluegrey500} size={18} pushRight={10}/> Logout
          </Text>
        </Flyout>

      </Header>
    );
  }

  handleMenuClick() {
    this.props.toggleAppSidebar();
  }

}

export default connect(
  state => ({location: state.location})
)(AppHeader);
