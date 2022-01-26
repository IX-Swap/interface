import makeStyles from '@mui/styles/makeStyles';

export default makeStyles(theme => ({
  indicator: {
    display: 'none'
  },
  tabRoot: {
    border: `1px solid ${theme.palette.divider}`,
    borderBottom: `1px solid transparent`,
    backgroundColor: theme.palette.backgrounds.light,
    minHeight: 37,
    paddingTop: 6,
    paddingBottom: 6,
    '&:last-child': {
      borderLeft: 'none'
    }
  },
  tabRootSelected: {
    borderBottom: `1px solid ${theme.palette.common.white}`,
    backgroundColor: theme.palette.common.white,
    marginBottom: -1
  },
  content: {
    border: `1px solid ${theme.palette.divider}`,
    borderTop: 'none',
    position: 'relative',
    top: -5,
    minHeight: 80,
    boxShadow: '1px 2px 3px rgba(0, 0, 0, 0.1)'
  }
}))
