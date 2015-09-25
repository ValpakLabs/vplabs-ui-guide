import React from 'react';

const defaultProps = {
  justify: 'space-between',
  dir: 'row',
  align: 'center',
  flex: 1,
  position: 'relative',
  wrap: 'nowrap'
};

const FlexRow = (props) => {
  const {justify, align, dir, flex, position, wrap, children} = {...defaultProps, ...props};

  const styles = {
    display: 'flex',
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

export default FlexRow;
