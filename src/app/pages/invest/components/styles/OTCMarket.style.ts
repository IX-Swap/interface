import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: theme.spacing(7),
    [theme.breakpoints.down('lg')]: {
      gridTemplateColumns: '1fr 1fr'
    },
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr'
    }
  }
}))
