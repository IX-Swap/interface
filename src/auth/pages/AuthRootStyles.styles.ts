import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    width: '100vw',
    minHeight: '100vh',
    backgroundColor: theme.palette.backgrounds.light,
    position: 'relative',
    paddingTop: 36,
    paddingBottom: 36,
    [theme.breakpoints.down('sm')]: {
      padding: '24px 16px',
      height: 'auto',
      marginLeft: 0
    }
  },
  formContainer: {
    display: 'grid',
    alignItems: 'center',
    backgroundColor: theme.palette.backgrounds.default,
    border: `1px solid ${theme.palette.divider}`,
    borderRight: 'none',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
    paddingTop: 35,
    paddingBottom: 35,
    paddingLeft: 50,
    paddingRight: 50,
    minHeight: 550,
    [theme.breakpoints.down('sm')]: {
      borderBottomLeftRadius: 0,
      borderTopRightRadius: theme.shape.borderRadius,
      borderRight: `1px solid ${theme.palette.divider}`
    }
  }
}))
