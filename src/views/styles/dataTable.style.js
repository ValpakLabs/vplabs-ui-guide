import colors from '../../theme/colors';

function getDataTableStyles() {
  let base =  {
    width: '100%'
  };
  let row = {
    padding: '12px 3px',
    display: 'flex',
    alignItems: 'stretch',
    borderBottom: `1px solid ${colors['grey-300']}`
  };
  let headerRow = {
    ...row,
    // background: colors['grey-200'],
    borderTop: `3px solid ${colors.grey300}`,
    borderBottomColor: colors.grey300
  };
  return {
    base,
    row,
    headerRow
  };
}

export default getDataTableStyles();

