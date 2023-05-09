import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    paddingTop: '15px !important',
    [theme.breakpoints.down('lg')]: {
      paddingLeft: 30
    }
  }
}))
