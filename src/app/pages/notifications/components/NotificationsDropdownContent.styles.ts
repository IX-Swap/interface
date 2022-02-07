import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: theme.palette.backgrounds.light
  },
  list: {
    position: 'relative',
    width: 400,
    height: 300,
    marginTop: 10,
    marginBottom: 5
  }
}))
