import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  text: {
    color: theme.palette.text.primary,
    fontSize: 14,
    fontWeight: 400,
    lineHeight: 1.6,

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
