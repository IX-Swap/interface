import { grey } from '@mui/material/colors'
import makeStyles from '@mui/styles/makeStyles'

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
