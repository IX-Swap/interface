import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.backgrounds.secondary,
    position: 'relative'
  },
  formContainer: {
    display: 'grid',
    alignItems: 'center',
    backgroundColor: theme.palette.backgrounds.main,
    border: `1px solid ${theme.palette.divider}`,
    borderRight: 'none',
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
    paddingTop: 35,
    paddingBottom: 35,
    paddingLeft: 50,
    paddingRight: 50,
    minHeight: 550
  }
}))
