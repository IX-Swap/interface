import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(5),
    borderRadius: 8
  },
  infoBlock: {
    margin: theme.spacing(0.5, 2.5, 2.5, 0)
  },
  button: {
    width: '100%'
  }
}))
