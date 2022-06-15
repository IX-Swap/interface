import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  text: {
    color: 'inherit',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    lineHeight: 'inherit',

    [theme.breakpoints.down('lg')]: {
      display: 'inline'
    },

    [theme.breakpoints.down('md')]: {
      display: 'block'
    },

    [theme.breakpoints.down('sm')]: {
      display: 'inline'
    }
  }
}))
