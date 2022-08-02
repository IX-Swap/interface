import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  container: {
    position: 'relative',
    maxWidth: '100vw',

    '& .carousel__slider': {
      paddingBottom: theme.spacing(2)
    }
  },
  wrapper: {
    position: 'relative',
    marginBottom: theme.spacing(4),
    marginLeft: theme.spacing(-2),
    paddingLeft: theme.spacing(2)
  }
}))
