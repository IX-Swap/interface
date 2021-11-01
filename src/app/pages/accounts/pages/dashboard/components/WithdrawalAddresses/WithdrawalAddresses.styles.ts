import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'initial',
    color: '#fff',
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    display: 'initial',
    textAlign: 'center',
    [theme.breakpoints.down('xs')]: {
      position: 'relative',
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
      paddingRight: theme.spacing(2)
    }
  },
  secondBlock: {
    width: 'initial',
    [theme.breakpoints.down('xs')]: {
      width: '50%'
    }
  },
  iconBlock: {
    position: 'absolute',
    right: 0,
    top: -3
  },
  icon: {
    color: '#fff'
  },
  label: {
    position: 'relative',
    display: 'block',
    fontWeight: 600,
    whiteSpace: 'pre-wrap',
    paddingRight: theme.spacing(3.75),
    [theme.breakpoints.down('xs')]: {
      position: 'initial'
    }
  },
  value: {
    whiteSpace: 'nowrap'
  }
}))
