import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  label: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(1),
    height: theme.spacing(11.5),
    width: theme.spacing(50),
    padding: theme.spacing(3)
  }
}))
