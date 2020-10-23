import { grey } from '@material-ui/core/colors'
import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  image: {
    height: '150px',
    width: '150px',
    backgroundPosition: 'center',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    marginRight: '1em'
  },
  label: {
    color: grey[500],
    fontSize: '.95em'
  },
  key: {
    color: grey[700],
    paddingTop: '1em'
  }
}))
