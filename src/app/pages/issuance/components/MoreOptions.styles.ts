import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  link: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2)
  },
  buttonLink: {
    color: theme.palette.primary.main,
    fontSize: '0.75rem',
    cursor: 'pointer',
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2)
  }
}))
