import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.backgrounds.light
        : theme.palette.backgrounds.lighter,
    borderRadius: '4px 4px 0 0',
    padding: theme.spacing(7, 2, 5.25)
  },
  name: {
    padding: theme.spacing(2.5, 0, 0.5)
  },
  email: {
    paddingBottom: theme.spacing(1.25)
  }
}))
