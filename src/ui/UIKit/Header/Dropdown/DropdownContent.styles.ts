import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  popper: {
    zIndex: 1500,
    transform: 'translate(0, 84px)!important',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    '& > div': {
      boxShadow: 'none',
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8
    }
  }
}))
