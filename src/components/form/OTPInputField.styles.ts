import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {},
  fullwidth: {
    width: '100%',
    justifyContent: 'center'
  },
  base: {
    height: 38,
    width: `38px !important`,
    padding: theme.spacing(1),
    display: 'block',
    outline: 'none',
    boxSizing: 'border-box',
    fontSize: 22,
    fontWeight: 500,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  standard: {
    border: 'none',
    borderBottom: `1px solid ${theme.palette.primary.main}`
  },
  outlined: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius
  },
  error: {
    borderColor: theme.palette.error.main
  }
}))
