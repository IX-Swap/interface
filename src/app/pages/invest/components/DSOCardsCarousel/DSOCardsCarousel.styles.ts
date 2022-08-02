import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  container: {
    position: 'relative',
    maxWidth: '100vw',
    margin: '0 -12px',

    '& .carousel__slider': {
      paddingBottom: theme.spacing(2)
    }
  },
  wrapper: {
    position: 'relative',
    marginBottom: theme.spacing(4),
    paddingLeft: 16
  }
}))
