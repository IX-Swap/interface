import makeStyles from '@mui/styles/makeStyles';

export default makeStyles(theme => ({
  root: {
    height: 10,
    borderRadius: 5,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === 'light' ? 200 : 700]
  },
  bar: {
    borderRadius: 5
  },
  barColorPrimary: {
    backgroundColor: theme.palette.primary.main
  }
}))
