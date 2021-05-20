import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
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
  rail: {
    height: theme.spacing(0.25),
    backgroundColor: theme.palette.slider.background
  },
  track: {
    height: theme.spacing(0.25)
  },
  thumb: {
    width: `${theme.spacing(1.25)}px!important`,
    height: `${theme.spacing(1.25)}px!important`,
    marginTop: `${-theme.spacing(0.5)}px!important`,
    marginLeft: `${-theme.spacing(0.625)}px!important`,
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
  input: {
    textAlign: 'end'
  }
}))
