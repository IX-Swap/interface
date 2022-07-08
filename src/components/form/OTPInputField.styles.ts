import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {},
  fullwidth: {
    width: '100%',
    justifyContent: 'center',
    gap: 16,
    [theme.breakpoints.down('sm')]: {
      gap: 0
    }
  },
  base: {
    height: 70,
    width: `55px !important`,
    padding: theme.spacing(1),
    display: 'block',
    outline: 'none',
    boxSizing: 'border-box',
    fontSize: 22,
    fontWeight: 500,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      width: `45px !important`,
      height: 50
    }
  },
  standard: {
    border: 'none',
    borderBottom: `1px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.backgrounds.light,
    color: theme.palette.text.primary
  },
  outlined: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius
  },
  error: {
    borderColor: theme.palette.error.main
  }
}))
