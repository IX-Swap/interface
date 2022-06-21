import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    maxWidth: 1300,
    width: '100%'
  },
  container: {
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'rgb(250, 250, 250)'
        : theme.palette.background.paper,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: theme.spacing(5),
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingBottom: theme.spacing(5),
    [theme.breakpoints.down('lg')]: {
      paddingRight: theme.spacing(1),
      paddingLeft: theme.spacing(1)
    }
  }
}))
