import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  link: {
    fontSize: 14,
    color: theme.palette.primary.main,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.light
    }
  },
  line: {
    padding: theme.spacing(0, 1)
  }
}))
