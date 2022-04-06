import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    height: '100%!important',
    '&:hover': {
      background: 'initial!important',
      '& > div': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
      }
    },
    boxSizing: 'border-box',
    borderRadius: '0!important',
    borderTop: '1px solid transparent',
    borderBottom: '1px solid transparent'
  },
  opened: {
    borderBottom: `1px solid ${theme.palette.primary.main}`
  }
}))
