import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  capital: {
    color: theme.palette.text.hint,
    maxWidth: 100,
    marginTop: theme.spacing(1),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  }
}))
