import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    '& .MuiDialog-paper': {
      borderRadius: 5,
      margin: '1.5rem'
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
      [theme.breakpoints.down('sm')]: {
        lineHeight: 1.25,
        fontSize: '0.95rem'
      },
      [theme.breakpoints.down('xs')]: {
        fontSize: '0.7rem',
        lineHeight: 1
      }
    }
  },
  title: {
    fontWeight: 600
  },
  closeButton: {
    marginLeft: '3rem',
    display: 'inline-block',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0.25rem'
    }
  }
}))
