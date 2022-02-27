import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  button: {
    height: '100%',
    '&:hover': {
      background: 'initial',
      '& > div': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
      }
    }
  }
}))
