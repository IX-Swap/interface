import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  container: {
    width: '100%',
    maxWidth: 400,
    minWidth: 320,
    borderRadius: 8,
    padding: theme.spacing(5),
    boxShadow: 'none'
  },
  logoWrapper: {
    marginBottom: theme.spacing(2)
  },
  logo: {
    border: `1px solid ${theme.palette.menu.border}`,
    '&:hover': {
      backgroundColor: 'initial',
      cursor: 'initial'
    }
  },
  status: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 8,
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.1875, 2.875),
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.secondary.light
        : theme.palette.tooltip.bg,
    color:
      theme.palette.mode === 'light'
        ? theme.palette.text.secondary
        : theme.palette.divider
  },
  link: {
    width: '100%',
    padding: theme.spacing(0.5),
    marginTop: theme.spacing(3)
  }
}))
