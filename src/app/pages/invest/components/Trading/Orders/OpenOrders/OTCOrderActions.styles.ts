import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  status: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
      width: theme.spacing(14)
    }
  }
}))
