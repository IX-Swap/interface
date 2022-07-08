import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    position: 'initial',
    color: theme.palette.slider.activeColor,
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    display: 'initial',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      position: 'relative',
      paddingRight: 0,
      paddingLeft: 0,
      display: 'flex',
      textAlign: 'start'
    }
  },
  firstBlock: {
    width: 'initial',
    paddingRight: 0,
    [theme.breakpoints.down('sm')]: {
      width: '50%',
      paddingRight: theme.spacing(2)
    }
  },
  secondBlock: {
    width: 'initial',
    [theme.breakpoints.down('sm')]: {
      width: '50%'
    }
  },
  iconBlock: {
    position: 'absolute',
    right: -8,
    top: -3,
    '& svg': {
      fill: theme.palette.switch.color
    }
  },
  icon: {
    color: theme.palette.slider.activeColor
  },
  label: {
    position: 'relative',
    display: 'block',
    fontWeight: 600,
    whiteSpace: 'pre-wrap',
    color: theme.palette.primary.contrastText,
    paddingRight: theme.spacing(3.75),
    [theme.breakpoints.down('sm')]: {
      position: 'initial'
    }
  },
  value: {
    whiteSpace: 'nowrap',
    color: theme.palette.primary.contrastText
  }
}))
