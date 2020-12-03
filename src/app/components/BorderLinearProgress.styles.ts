import { Theme, makeStyles } from '@material-ui/core/styles'

export default makeStyles((theme: Theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700]
  },
  bar: {
    borderRadius: 5
  },
  barColorPrimary: {
    backgroundColor: theme.palette.primary.main
  }
}))
