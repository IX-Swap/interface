import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    color: '#fff',
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    display: 'initial',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      paddingRight: 0,
      paddingLeft: 0,
      display: 'flex',
      textAlign: 'start'
    }
  },
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
