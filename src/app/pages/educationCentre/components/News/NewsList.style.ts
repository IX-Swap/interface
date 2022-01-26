import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  container: {},
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  pagination: {
    width: '100%',
    marginTop: theme.spacing(4),
    borderBottom: 'none'
  }
}))
