import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  inputWrapper: {
    width: '1rem',
    marginLeft: '-7rem',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}))
