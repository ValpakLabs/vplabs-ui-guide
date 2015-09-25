import React from 'react';

class Flex extends React.Component {
  static defaultProps = {
    flex: 1,
    push: 0,
    position: 'relative'
  }

  render() {
    const {flex, position, push} = this.props;

    const styles = {
      flex: flex,
      margin: push,
      position
    };

    return <div style={{...styles, ...this.props.style}}>{this.props.children}</div>;
  }

}

export default Flex;
