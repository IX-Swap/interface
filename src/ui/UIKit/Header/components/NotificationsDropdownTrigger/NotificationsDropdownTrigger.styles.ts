import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    height: '80px!important',
    boxSizing: 'border-box',
    borderTop: '1px solid transparent',
    borderRadius: '0!important',
    borderBottom: `1px solid transparent`,

    '&:hover': {
      backgroundColor: 'initial!important',
      '& svg': {
        '& path': {
          fill:
            theme.palette.mode === 'light'
              ? theme.palette.primary.main
              : theme.palette.primary.contrastText
        }
      }
    }
  },
  opened: {
    borderBottom: `1px solid ${theme.palette.primary.main}!important`
  }
}))
