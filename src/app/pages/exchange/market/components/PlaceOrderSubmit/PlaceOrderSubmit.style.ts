import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  button: {
    width: '100%',
    backgroundColor: theme.palette.backgrounds.alternative,
    '&:hover': {
      backgroundColor: theme.palette.backgrounds.alternative,
      opacity: 0.7
    }
  }
}))
