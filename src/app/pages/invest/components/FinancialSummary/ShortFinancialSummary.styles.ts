import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => {
  return {
    wrapper: {
      borderRadius: 8,
      padding: theme.spacing(3),
      boxSizing: 'border-box',
      backgroundColor: '#fff'
    }
  }
})
