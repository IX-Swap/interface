import makeStyles from '@mui/styles/makeStyles'
import { grey } from '@mui/material/colors'

export default makeStyles(theme => ({
  label: {
    color: grey[500],
    fontSize: '.95em',
    paddingTop: '1.25em'
  },
  key: {
    margin: theme.spacing(5, 'auto', 10),
    padding: theme.spacing(1.25, 3),
    color:
      theme.palette.mode === 'light'
        ? theme.palette.text.primary
        : theme.palette.getContrastText('#F5EBEB'),
    backgroundColor: '#F5EBEB',
    borderRadius: 3
  },
  container: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    maxWidth: 480,
    padding: theme.spacing(1.5, 2),
    fontSize: 18,
    fontWeight: 500,
    backgroundColor:
      theme.palette.mode === 'light' ? '#F6F4FD' : theme.palette.primary.dark,
    borderRadius: 4
  },
  icon: {
    minWidth: 17,
    height: 17,
    marginTop: theme.spacing(0.5)
  },
  text: {
    margin: theme.spacing(0.5, 2, 0)
  }
}))
