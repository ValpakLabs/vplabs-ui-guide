const defaultProps = {
  justify: 'space-between',
  dir: 'column',
  align: 'center',
  flex: 1,
  position: 'relative',
  wrap: 'nowrap'
};

const FlexColumn = (props) => {
  const {justify, align, dir, flex, position, wrap, children} = {...defaultProps, ...props};

  const styles = {
    width: '100%',
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

export default FlexColumn;
