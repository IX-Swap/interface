import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: '95vw',
    margin: '0 -12px'
  },
  sliderWrapper: {
    position: 'relative',
    marginBottom: 65
  },
  dotGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& .carousel__dot': {
      display: 'none',
      width: '10px',
      height: '10px',
      borderRadius: '10px',
      background: theme.palette.grey[300],
      padding: '0',
      border: 'none',
      margin: '0 10px',

      '&--selected': {
        background: theme.palette.grey[500]
      },

      [theme.breakpoints.up('md')]: {
        '&:nth-child(2)': { display: 'block' },
        '&:nth-child(5)': { display: 'block' },
        '&:nth-child(8)': { display: 'block' },
        '&:nth-child(11)': { display: 'block' },
        '&:nth-child(14)': { display: 'block' },
        '&:nth-child(17)': { display: 'block' }
      }
    }
  },
  navButton: {
    position: 'absolute',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '52px',
    height: '52px',
    borderRadius: '52px',
    top: '50%',
    transform: 'translateY(-50%)',
    appearance: 'none',
    border: 'none',
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.getContrastText(theme.palette.grey[900]),
    backdropFilter: 'blur(4px)',
    opacity: 0.3,

    '&:hover': { opacity: 0.5 },

    '&:disabled': {
      display: 'none'
    }
  },
  backButton: { left: '-15px' },
  nextButton: { right: '-15px' }
}))
