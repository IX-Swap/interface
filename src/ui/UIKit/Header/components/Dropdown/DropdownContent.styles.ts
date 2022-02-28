import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  popper: {
    zIndex: 1500,
    transform: 'translate(0, 80px)!important',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    '& > div': {
      borderBottomLeftRadius: 8,
      borderBottomRightRadius: 8,
      border: `1px solid ${theme.palette.secondary.light}`,
      boxShadow:
        theme.palette.mode === 'light'
          ? '0px 80px 80px rgba(162, 172, 191, 0.16)!important'
          : 'none!important'
    }
  }
}))
