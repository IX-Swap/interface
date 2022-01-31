import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  contentWrapper: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(4.5, 5.5, 4.5, 5),
    borderRadius: 10,
    boxShadow:
      theme.palette.type === 'light'
        ? '0px 4px 62px rgba(170, 170, 170, 0.06)'
        : 'none'
  }
}))
