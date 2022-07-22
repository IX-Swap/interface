import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  backText: {
    [theme.breakpoints.down('md')]: {
      padding: 0
    }
  }
}))
