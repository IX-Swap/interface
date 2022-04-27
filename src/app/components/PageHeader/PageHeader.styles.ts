import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  backButton: {
    position: 'relative',
    top: 2,
    marginRight: theme.spacing(0.5)
  },
  header: {
    marginBottom: theme.spacing(2)
  },
  container: {
    marginBottom: theme.spacing(3)
  },
  noMargin: {
    margin: 0
  },
  wrapper: {
    // background: 'red',
    position: `relative`,
    background: 'rgba(255, 255, 255, 0.75)',
    border: 'none',
    marginTop: '1rem',
    marginBottom: '1rem',
    maxHeight: 130,
    paddingTop: 33,
    paddingBottom: 33,
    width: '100%'
  }
}))
