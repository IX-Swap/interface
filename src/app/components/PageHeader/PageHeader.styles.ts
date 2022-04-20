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
    width: '100vw',
    left: `50%`,
    right: `50%`,
    marginLeft: `-50vw`,
    marginRight: `-50vw`,
    marginTop: `-3vw`,
    padding: `3% 16% 10% 16%`,
    marginBottom: `2vw`,

    [theme.breakpoints.down('md')]: {
      width: `102vw`
    },

    [theme.breakpoints.down('sm')]: {
      width: `125vw`
    },

    [theme.breakpoints.down('600')]: {
      width: `105vw`
    },

    [theme.breakpoints.down('400')]: {
      width: `31rem`
    }
  }
}))
