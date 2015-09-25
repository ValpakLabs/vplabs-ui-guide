import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {createTransitionHook} from '../universalRouter';
import * as authActions from '../actions/authActions';
import {requireServerCss, requireServerImage} from '../util';
import colors, colors from '../theme/colors';
import Box from './Box';
import Text from './Text';
import FlexRow from './FlexRow';
import Input from './Input';
import Button from './Button';
import Icon from './Icon';
import Picture from './Picture';

@connect(state => ({
  auth: state.auth.toJS()
}))
class Login extends React.Component {

  static contextTypes = {
    router: PropTypes.object,
    store: PropTypes.object
  }

  componentDidMount() {
    const logo = ReactDOM.findDOMNode(this.refs.logo);
    const login = ReactDOM.findDOMNode(this.refs.login);
    setTimeout(() => {
      login.style.opacity = 1;
      logo.style.opacity = 1;
      logo.style.transform = 'translateY(0)';
    });
  }

  componentWillUnmount() {
   
  }

  state = {
    username: null,
    password: null
  }

  render() {
    const {error, user} = this.props.auth;
    const {username, password} = this.state;

    return (
      <div ref='body' onKeyUp={::this.handleKeyUp} style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', background: colors['blue-grey-800'], width: '100%'}}>

        <Picture
          ref='logo'
          src='/logo.png'
          shadow={false}
          width={200}
          style={{
            opacity: 0,
            transform: 'translateY(-20px)',
            transition: 'all 1s .4s cubic-bezier(0.230, 1.000, 0.320, 1.000)',
            position: 'absolute',
            top: '20vh',
            left: '50%',
            marginLeft: '-100px'}}/>

        <FlexRow
          ref='login'
          justify='center'
          flex='none'
          align='center'
          style={{
            opacity: 0,
            transition: 'opacity 0.4s .1s ease-out'}}>

          <Input
            color='#FFF'
            borderColor={colors['blue-grey-900']}
            fill={colors['blue-grey-900']}
            flex={1}
            width={250}
            push='0 10px 0 0'
            placeholder='Username'
            name='username'
            value={username}
            icon='person'
            onChange={::this.handleInput}/>

          <Input
            color='#FFF'
            borderColor={colors['blue-grey-900']}
            fill={colors['blue-grey-900']}
            flex={1}
            width={250}
            push='0 10px 0 0'
            placeholder='Password'
            type='password'
            name='password'
            icon='lock'
            value={password}
            onChange={::this.handleInput}/>

          <Button
            fab={true}
            shadow={false}
            icon='arrow_forward'
            fill={colors.lightblue500}
            color='white'
            style={{height: 40, width: 40}}
            onClick={::this.handleLogin}/>

          {error &&
            <div style={{
              position: 'absolute',
              width: '100%',
              left: 0,
              bottom: '-52px',
              background: colors['red-500'],
              padding: 8,
              borderRadius: 2,
              color: '#FFF'
            }}>
              {error}
            </div>
          }
        </FlexRow>

      </div>
    );
  }

  handleLogin() {
    const {username, password} = this.state;
    this.props.dispatch(authActions.login({username, password}, this.context.router));
  }

  handleInput(change) {
    this.setState(change);
  }

  handleKeyUp(e) {
    if (e.keyCode === 13)
      this.handleLogin();
  }

}

export default Login;
