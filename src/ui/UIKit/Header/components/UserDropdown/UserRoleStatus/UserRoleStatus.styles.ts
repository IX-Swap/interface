import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'block',
    padding: theme.spacing(1.25, 3),
    color:
      theme.palette.mode === 'light'
        ? theme.palette.text.secondary
        : theme.palette.primary.contrastText,
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.background.default
        : '#1D3667',
    borderRadius: 100
  }
}))
