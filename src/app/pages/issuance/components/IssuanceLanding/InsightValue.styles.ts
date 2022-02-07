import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  root: {
    color: theme.palette.text.primary,
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.h4.fontWeight,

    [theme.breakpoints.up('lg')]: {
      fontSize: theme.typography.h3.fontSize
    }
  }
}))
