import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  tradeRoot: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: 1300
    }
  }
}))
