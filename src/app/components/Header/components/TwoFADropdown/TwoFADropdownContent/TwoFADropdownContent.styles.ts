import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    width: 300,
    padding: theme.spacing(5, 4.5),
    textAlign: 'center',
    backgroundColor: theme.palette.backgrounds.light
  },
  iconBlock: {
    marginBottom: theme.spacing(2)
  }
}))
