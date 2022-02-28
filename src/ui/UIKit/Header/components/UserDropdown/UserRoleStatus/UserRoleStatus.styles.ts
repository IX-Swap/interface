import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'block',
    padding: theme.spacing(1.25, 3),
    color: theme.palette.text.secondary,
    backgroundColor: theme.palette.background.default,
    borderRadius: 100
  }
}))
