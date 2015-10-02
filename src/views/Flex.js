import React from 'react';

const defaultProps = {
  width: '100%',
  height: '100%',
  push: 0,
  align: 'auto',
  flex: 1,
  position: 'relative'
};

const Flex = (props) => {
  const {flex, position, align, push} = {...defaultProps, ...props};

  const styles = {
    margin: push,
    alignSelf: align,
    position: position,
    flex: flex,
    ...props.style
  };

  return <div style={styles}>{props.children}</div>;
};

export default Flex;
