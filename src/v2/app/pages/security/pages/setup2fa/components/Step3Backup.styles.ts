import { makeStyles } from '@material-ui/styles'
import { grey } from '@material-ui/core/colors'

export default makeStyles(() => ({
  label: {
    color: grey[500],
    fontSize: '.95em',
    paddingTop: '1.25em'
  },
  key: {
    color: grey[700],
    paddingTop: '2.5em'
  }
}))
