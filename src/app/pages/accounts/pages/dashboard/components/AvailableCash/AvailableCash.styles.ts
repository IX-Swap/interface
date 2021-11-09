import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
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
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      width: '50%'
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'flex-start'
    }
  },
  label: {
    fontWeight: 600,
    whiteSpace: 'nowrap'
  },
  value: {
    whiteSpace: 'nowrap',
    [theme.breakpoints.up('lg')]: {
      '&:not(:last-child)': {
        paddingRight: theme.spacing(3)
      }
    }
  }
}))
