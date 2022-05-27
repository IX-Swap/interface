import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    width: 'calc(100% - 316px)',
    gap: theme.spacing(2),

    [theme.breakpoints.down('md')]: {
      width: '100%',
      justifyContent: 'space-between'
    }
  },
  item: {
    [theme.breakpoints.down('md')]: {
      width: 'calc(50% - 8px)',
      '&:only-child': {
        width: '100%'
      }
    }
  },
  button: {
    width: 140,
    height: 49,

    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  }
}))
