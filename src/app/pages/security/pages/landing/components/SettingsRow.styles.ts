import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
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
