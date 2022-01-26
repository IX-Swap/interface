import makeStyles from '@mui/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    '& .MuiDialog-paper': {
      borderRadius: 5,
      margin: '2rem',

      width: 'max-content',
      [theme.breakpoints.up('md')]: {
        padding: '2rem'
      },
      height: 'auto'
    }
  },
  titleRoot: {
    paddingTop: 0,
    paddingBottom: 0.5,
    textAlign: 'center'
  },
  title: {
    fontWeight: 500,
    textTransform: 'none'
  }
}))
