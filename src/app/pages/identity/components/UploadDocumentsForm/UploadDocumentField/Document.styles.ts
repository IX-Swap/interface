import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.background.paper
        : theme.palette.button?.bgTextHover,
    marginTop: 8,
    marginBottom: 8,
    padding: 16,
    boxShadow: 'none',
    borderRadius: 8
  }
}))
