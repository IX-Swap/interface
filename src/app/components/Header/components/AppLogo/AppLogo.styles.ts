import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    '-webkit-tap-highlight-color': 'transparent',

    '&:hover': {
      opacity: 0.6
    }
  }
}))
