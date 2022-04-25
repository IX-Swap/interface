import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  backButton: {
    position: 'relative',
    top: 2,
    marginRight: theme.spacing(0.5)
  },
  header: {
    marginBottom: theme.spacing(2)
  },
  container: {
    marginBottom: theme.spacing(3)
  },
  noMargin: {
    margin: 0
  },
  wrapper: {
    position: `relative`,
    background: 'rgba(255, 255, 255, 0.75)',
    border: 'none',
    height: '120px',
    width: 'auto',
    maxWidth: '100vw',
    left: `50%`,
    right: `50%`,
    marginLeft: `-50vw`,
    marginRight: `-50vw`,
    marginTop: `-1vw`,
    padding: `3% 16% 10% 16%`,
    marginBottom: `3vw`,

    [theme.breakpoints.down('700')]: {
      left: `30%`,
      right: `70%`,
      marginLeft: `-35%`,
      marginRight: `0%`,
      maxWidth: '130%',
      minWidth: '100%'
    },

    [theme.breakpoints.down('400')]: {
      marginTop: `-2vw`
    }
  }
}))
