import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  meta: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(2),
    gap: `${theme.spacing(0.5)}px`,
    fontSize: theme.typography.fontSize
  },
  capital: {
    color: theme.palette.text.hint,
    maxWidth: 100,
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  }
}))
