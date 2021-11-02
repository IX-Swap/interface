import { makeStyles } from '@material-ui/core/styles'
import TopographyImage from 'assets/images/topography-pattern.png'

export const useStyles = makeStyles(theme => ({
  container: {
    backgroundImage: `linear-gradient(90deg, #113B7D, #2A67C4)`
  },
  cardContent: {
    backgroundImage: `url(${TopographyImage})`,
    paddingLeft: 24,
    paddingRight: 24,
    '&:last-child': {
      paddingBottom: 16
    }
  },
  textContent: {
    fontSize: 18,
    lineHeight: '40px',
    color: '#fff',
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
      lineHeight: '16px'
    }
  },
  currencySelect: {
    backgroundColor: '#fff'
  },
  depositLink: {
    height: 40,
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#fff'
    }
  }
}))
