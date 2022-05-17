import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& .MuiDialog-paper': {
      borderRadius: 5,
      margin: '1.5rem'
    },
    '& .MuiDialog-container': {
      height: 'fit-content'
    }
  },
  title: {
    fontWeight: 600
  },
  closeButton: {
    position: 'absolute',
    top: '0.2rem',
    right: '0.2rem',
    display: 'inline-block'
  }
}))
