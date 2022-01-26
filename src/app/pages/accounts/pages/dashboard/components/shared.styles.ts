import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  wrapper: {
    color: theme.palette.slider.activeColor,
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    display: 'initial',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      paddingRight: 0,
      paddingLeft: 0,
      display: 'flex',
      textAlign: 'start'
    }
  }
}))
