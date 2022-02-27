import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    '&:hover': {
      backgroundColor: 'initial',
      '& svg': {
        '& path': {
          fill:
            theme.palette.mode === 'light'
              ? theme.palette.primary.main
              : theme.palette.primary.contrastText
        }
      }
    }
  }
}))
