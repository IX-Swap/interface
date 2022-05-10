import { makeStyles } from '@mui/styles'

export default makeStyles(theme => ({
  wrapper: {
    minWidth: 180,
    [theme.breakpoints.down('xs')]: {
      minWidth: 'initial',
      marginTop: theme.spacing(2)
    }
  },
  boxWrapper: {
    width: 120
  },
  switchWrapper: {
    marginRight: 40
  }
}))
