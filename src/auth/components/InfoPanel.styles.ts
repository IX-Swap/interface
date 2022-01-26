import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  container: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    paddingTop: 35,
    paddingBottom: 35,
    paddingLeft: 60,
    paddingRight: 60
  }
}))
