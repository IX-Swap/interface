import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    background: theme.palette.mode === 'light' ? '#F6F4FD' : '#868294',
    padding: theme.spacing(1.5, 2),
    margin: theme.spacing(2.625, 2.625, 0, 2.625),
    display: 'flex',
    alignItems: 'flex-start',
    gap: theme.spacing(1.5)
  },
  icon: {
    width: 18,
    height: 18,
    marginTop: theme.spacing(0.25)
  },
  connectLink: {
    display: 'inline-block',
    textDecoration: 'underline',
    color: theme.palette.primary.main,
    margin: '0 3px',
    cursor: 'pointer'
  }
}))
