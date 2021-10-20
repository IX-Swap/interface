import { makeStyles } from '@material-ui/core/styles'
import TopographyImage from 'assets/images/topography-pattern.png'

export const useStyles = makeStyles(theme => ({
  container: {
    backgroundImage: `linear-gradient(90deg, #113B7D, #2A67C4)`
  },
  cardContent: {
    backgroundImage: `url(${TopographyImage})`,
    paddingLeft: 16,
    paddingRight: 16,
    '&:last-child': {
      paddingBottom: 16
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
      marginTop: 16,
      marginBottom: 16
    }
  }
}))
