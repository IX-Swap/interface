import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    textAlign: 'center',
    padding: [theme.spacing(6), theme.spacing(3)].join(' '),
    marginBottom: theme.spacing(2)
  },
  description: {
    color: theme.palette.text.secondary
  },
  link: {
    width: '100%',
    maxWidth: '300px',
    padding: theme.spacing(2),
    marginTop: theme.spacing(1)
  }
}))
