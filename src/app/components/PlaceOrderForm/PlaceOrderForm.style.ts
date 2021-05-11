import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: theme.palette.backgrounds.alternativeLight,
    paddingBottom: theme.spacing(3)
  },
  tabs: {},
  tab: {
    color: theme.palette.backgrounds.alternative,
    minWidth: 100
  },
  balanceWrapper: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  formWrapper: {
    boxSizing: 'border-box',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  inputGrid: {
    marginBottom: theme.spacing(2)
  },
  sliderWrapper: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(0.5)
  },
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: theme.spacing(7),
      width: '100%',
      backgroundColor: theme.palette.backgrounds.alternative
    }
  },
  rail: {
    height: theme.spacing(0.25),
    backgroundColor: theme.palette.slider.background
  },
  track: {
    height: theme.spacing(0.25)
  },
  thumb: {
    width: theme.spacing(1.25),
    height: theme.spacing(1.25),
    marginTop: -theme.spacing(0.5),
    marginLeft: -theme.spacing(0.625),
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.backgrounds.default,
    zIndex: 3
  },
  mark: {
    top: theme.spacing(1.875),
    backgroundColor: theme.palette.slider.background,
    width: theme.spacing(1),
    height: theme.spacing(1),
    borderRadius: '50%',
    transform: 'translateX(-50%)'
  },
  markActive: {
    backgroundColor: theme.palette.primary.main,
    opacity: 1,
    zIndex: 2
  },
  button: {
    width: '100%',
    backgroundColor: theme.palette.backgrounds.alternative,
    '&:hover': {
      backgroundColor: theme.palette.backgrounds.alternative,
      opacity: 0.7
    }
  }
}))
