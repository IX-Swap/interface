import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  filters: {
    backgroundColor: theme.palette.backgrounds.light,
    borderTop: 'solid 1px #DBE2EC',
    borderBottomLeftRadius: '10px',
    borderBottomRightRadius: '10px'
  },
  tabsRoot: {
    backgroundColor: theme.palette.backgrounds.light,
    borderTopLeftRadius: '10px',
    borderTopRightRadius: '10px',
    marginLeft: 0
  },
  indicator: {
    display: 'none'
  },
  tabRoot: {
    borderBottom: `1px solid ${theme.palette.backgrounds.light}`,
    textTransform: 'capitalize',
    backgroundColor: theme.palette.backgrounds.light,
    minWidth: 45,
    minHeight: 80,
    marginLeft: 24,
    padding: '0 6px'
  },
  tabRootSelected: {
    color: '#343A47 !important',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.common.white
  }
}))
