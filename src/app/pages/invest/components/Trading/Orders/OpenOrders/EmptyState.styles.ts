import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    minHeight: 309,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  title: {
    fontWeight: 600,
    fontSize: theme.spacing(2.125),
    lineHeight: '22px',
    color: theme.palette.mode === 'light' ? '#343A47' : '#fff',
    marginTop: theme.spacing(2.5)
  },
  subtitle: {
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: '16px',
    maxWidth: 293,
    textAlign: 'center',
    marginTop: theme.spacing(1),
    color: theme.palette.mode === 'light' ? '#778194' : '#fff'
  },
  connectLink: {
    display: 'inline-block',
    textDecoration: 'underline',
    color: theme.palette.primary.main,
    margin: '0 3px'
  }
}))
