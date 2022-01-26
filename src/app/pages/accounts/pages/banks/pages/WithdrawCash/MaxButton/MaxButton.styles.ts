import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  button: {
    '&:hover': {
      backgroundColor: 'transparent',
      textDecoration: 'underline'
    },
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    fontWeight: 600
  }
}))
