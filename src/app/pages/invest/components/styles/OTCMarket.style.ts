import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: theme.spacing(7),
    [theme.breakpoints.down('md')]: {
      gridTemplateColumns: '1fr 1fr'
    },
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr'
    }
  }
}))
