import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  children: {
    marginLeft: 'auto',
    padding: '0!important'
  },
  link: {
    color: theme.palette.primary.main
  },
  line: {
    padding: theme.spacing(0, 1)
  }
}))
