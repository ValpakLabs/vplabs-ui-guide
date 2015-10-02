import React from 'react';

const defaultProps = {
  justify: 'flex-start',
  align: 'flex-start',
  dir: 'row',
  pad: 0,
  flex: 'none',
  position: 'relative',
  wrap: 'nowrap'
};

const FlexBox = (props) => {
  const {pad, justify, align, dir, flex, position, wrap, children} = {...defaultProps, ...props};

  const styles = {
    display: 'flex',
    padding: pad,
    flex: flex,
    flexWrap: wrap,
    alignItems: align,
    flexDirection: dir,
    justifyContent: justify,
    position: position,
    ...props.style
  };

  return (
    <div {...props} style={styles}>{children}</div>
  );
};

export default FlexBox;
