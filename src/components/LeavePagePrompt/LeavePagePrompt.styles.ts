import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  congested: {
    color: theme.palette.error.main,
    textAlign: 'center',
    marginTop: theme.spacing(1)
  }
}))
