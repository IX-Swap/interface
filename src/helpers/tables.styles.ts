import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => {
  return {
    bolder: {
      color: theme.palette.mode === 'light' ? '#3B4251' : '#FFFFFF',
      fontWeight: 500
    }
  }
})
