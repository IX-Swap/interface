import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  rail: {
    height: theme.spacing(0.25),
    backgroundColor: theme.palette.slider.background
  },
  track: {
    height: theme.spacing(0.25)
  },
  thumb: {
    width: `${theme.spacing(1.25)}!important`,
    height: `${theme.spacing(1.25)}!important`,
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
  }
}))
