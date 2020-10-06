import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  link: {
    display: 'flex',
    alignItems: 'center',
    height: 88,
    marginTop: theme.spacing(4.375),
    color: theme.palette.text.disabled,
    textDecoration: 'none',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.background.default
    }
  },
  active: {
    color: theme.palette.primary.main
  },
  icon: {
    width: 28,
    height: 28
  }
}))
