import React from 'react';

const ScrollView = (props) => {
  const styles = {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    overflow: 'auto',
    pointerEvents: 'all',
    ...props.style
  };

  return (
    <div {...props} style={styles}>{props.children}</div>
  );
};

export default ScrollView;
