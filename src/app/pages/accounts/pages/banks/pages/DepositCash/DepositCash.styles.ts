import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    [theme.breakpoints.down('lg')]: {
      paddingLeft: 20
    }
  }
}))
