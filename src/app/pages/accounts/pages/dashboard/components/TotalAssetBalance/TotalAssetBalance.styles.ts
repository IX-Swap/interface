import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  firstBlock: {
    width: 'initial',
    paddingRight: 0,
    [theme.breakpoints.down('xs')]: {
      width: '50%',
      paddingRight: theme.spacing(1)
    }
  },
  secondBlock: {
    width: 'initial',
    [theme.breakpoints.down('xs')]: {
      width: '50%'
    }
  },
  label: {
    fontWeight: 600
  },
  value: {
    whiteSpace: 'nowrap'
  }
}))
