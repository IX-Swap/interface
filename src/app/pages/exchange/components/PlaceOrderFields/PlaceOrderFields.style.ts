import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  container: {
    boxSizing: 'border-box',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  inputGrid: {
    marginBottom: theme.spacing(2)
  },
  sliderWrapper: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5)
  },
  input: {
    textAlign: 'end'
  },
  button: {
    width: '100%',
    backgroundColor: theme.palette.backgrounds.alternative,
    '&:hover': {
      backgroundColor: theme.palette.backgrounds.alternative,
      opacity: 0.7
    }
  }
}))
