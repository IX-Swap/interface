import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  stepButtons: {
    width: 'auto',
    display: 'flex',
    paddingBotton: 5,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  }
}))
