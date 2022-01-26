import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    position: 'relative',
    maxWidth: '95vw',
    margin: '0 -12px',

    '& .carousel__slider': {
      paddingBottom: theme.spacing(2)
    }
  },
  sliderWrapper: {
    position: 'relative',
    marginBottom: theme.spacing(4)
  },
  dotGroup: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(6),

    '& .carousel__dot': {
      display: 'block',
      width: '10px',
      height: '10px',
      borderRadius: '10px',
      background: theme.palette.grey[300],
      padding: '0',
      border: 'none',
      margin: '0 10px',
      pointerEvents: 'none',

      '&--selected': {
        background: theme.palette.grey[500]
      },

      [theme.breakpoints.up('md')]: {
        pointerEvents: 'initial',
        '&:nth-child(2n)': { display: 'none' }
      },

      [theme.breakpoints.up('lg')]: {
        '&:nth-child(2n)': { display: 'block' },
        '&:nth-child(1)': { display: 'none' },
        '&:nth-child(3)': { display: 'none' },
        '&:nth-child(4)': { display: 'none' },
        '&:nth-child(6)': { display: 'none' },
        '&:nth-child(7)': { display: 'none' },
        '&:nth-child(9)': { display: 'none' }
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
  backButton: {
    left: '-15px',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'initial'
    }
  },
  nextButton: {
    right: '-15px',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'initial'
    }
  }
}))
