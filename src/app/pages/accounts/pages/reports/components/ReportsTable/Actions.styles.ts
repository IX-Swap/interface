import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  link: {
    display: 'block',
    padding: theme.spacing(1, 0),
    textTransform: 'uppercase',
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.light
    }
  }
}))
