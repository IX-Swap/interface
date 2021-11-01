import { makeStyles } from '@material-ui/core/styles'
import TopographyImage from 'assets/images/topography-pattern.png'

export const useStyles = makeStyles(theme => ({
  container: {
    backgroundImage: `linear-gradient(90deg, #113B7D, #2A67C4)`
  },
  cardContent: {
    backgroundImage: `url(${TopographyImage})`,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    '&:last-child': {
      paddingBottom: theme.spacing(2)
    }
  },
  wrapper: {
    flexDirection: 'row',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column'
    }
  },
  line: {
    height: 'auto',
    width: 1,
    backgroundColor: '#79A6EC',
    marginTop: 0,
    marginBottom: 0,

    [theme.breakpoints.down('xs')]: {
      height: 1,
      width: '100%',
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    }
  }
}))
