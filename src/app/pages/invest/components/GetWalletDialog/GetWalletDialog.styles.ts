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
  titleRoot: {
    paddingTop: 0,
    paddingBottom: 0.5,
    textAlign: 'center',
    '& .MuiTypography-root': {
      fontWeight: 600,
      lineHeight: 1.875,
      fontSize: '1.125rem',
      [theme.breakpoints.down('md')]: {
        lineHeight: 1.25,
        fontSize: '0.95rem'
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.7rem',
        lineHeight: 1
      }
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
