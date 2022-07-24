import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  container: { marginBottom: theme.spacing(3), flexWrap: 'nowrap' },
  wrapperType: {
    width: 'calc(100% - 80px)'
  },
  type: {
    display: 'block',
    textAlign: 'center',
    padding: theme.spacing(1.1875, 2.875),
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.secondary.light
        : theme.palette.tooltip.bg,
    color:
      theme.palette.mode === 'light'
        ? theme.palette.text.secondary
        : theme.palette.divider,
    borderRadius: 8,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}))
