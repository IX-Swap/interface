import { makeStyles } from '@material-ui/styles'

export default makeStyles(() => ({
  button: {
    fontWeight: 'bold',
    width: '100px'
  },
  logoImg: {
    height: '2.5em',
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
