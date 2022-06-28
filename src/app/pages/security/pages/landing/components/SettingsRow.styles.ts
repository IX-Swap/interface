import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  wrapper: {
    marginRight: -30,
    [theme.breakpoints.up('lg')]: {
      height: 40,
      marginRight: 0
    }
  },
  content: {
    flexWrap: 'wrap'
  },
  logoImg: {
    height: '4em',
    marginRight: '1em'
  },
  btnImg: {
    height: '3rem',
    marginRight: '1.5em'
  },
  btnLabel: {
    fontSize: '0.95rem'
  },
  popupBtn: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
}))
