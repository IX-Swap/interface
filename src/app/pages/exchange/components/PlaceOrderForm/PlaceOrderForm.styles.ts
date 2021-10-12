import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.backgrounds.alternativeLight
        : '#292929',
    paddingBottom: theme.spacing(3)
  },
  tab: {
    color: theme.palette.backgrounds.alternative,
    minWidth: 80
  },
  balanceWrapper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: theme.spacing(7),
      width: '100%',
      backgroundColor: theme.palette.backgrounds.alternative
    }
  },
  buttonWrapper: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  button: {
    width: '100%',
    backgroundColor: theme.palette.backgrounds.alternative,
    '&:hover': {
      backgroundColor: theme.palette.backgrounds.alternative,
      opacity: 0.7
    }
  }
}))
