import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'flex-start',
      paddingBottom: theme.spacing(2)
    }
  }
}))
