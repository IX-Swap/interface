import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {},
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  pagination: {
    width: '100%',
    marginTop: theme.spacing(4),
    borderBottom: 'none'
  }
}))
