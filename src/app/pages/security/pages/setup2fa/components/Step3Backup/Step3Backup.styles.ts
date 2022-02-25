import makeStyles from '@mui/styles/makeStyles'
import { grey } from '@mui/material/colors'

export default makeStyles(theme => ({
  label: {
    color: grey[500],
    fontSize: '.95em',
    paddingTop: '1.25em'
  },
  key: {
    color: grey[700],
    padding: '1.5em 2.5em',
    margin: '1.5em auto',
    border: `1px solid ${theme.palette.divider}`,
    wordBreak: 'break-all'
  }
}))
