import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  button: {
    '&:hover': {
      background: 'initial',
      '& svg': {
        fill: theme.palette.primary.main
      }
    },
    '& svg': {
      fill: theme.palette.text.secondary
    }
  }
}))
