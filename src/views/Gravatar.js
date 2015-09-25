import React, {PropTypes, Component} from 'react';
import Picture from './Picture';
import {md5} from '../util';

class Gravatar extends Component {

  static propTypes = {

  }

  static defaultProps = {
    size: 120,
    email: '',
    onClick: e => null
  }

  render() {
    const {size, email} = this.props;

    const styles = {
      base: {}
    };

    const hash = md5(email);
    const randomUserNumber = parseInt(hash, 16) % 10;
    const gravatarUrl = `http://www.gravatar.com/avatar/${hash}?s=200&d=http://lorempixel.com/400/400/cats/${randomUserNumber}`;

    return (
      <Picture
        id={this.props.id}
        onClick={e => this.props.onClick(e)}
        width={size}
        height={size}
        shadow={false}
        radius='50%'
        src={gravatarUrl}
        style={this.props.style}/>
    );
  }

}

export default Gravatar;
