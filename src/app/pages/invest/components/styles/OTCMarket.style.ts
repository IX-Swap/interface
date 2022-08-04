import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: theme.spacing(2),
    [theme.breakpoints.down('lg')]: {
      display: 'flex',
      justifyContent: 'center'
    }
  }
}))
