import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  container: {
    width: '100%',
    borderRadius: 8,
    padding: theme.spacing(3),
    boxShadow: 'none',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5)
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: 400
    }
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
    marginTop: theme.spacing(3)
  }
}))
