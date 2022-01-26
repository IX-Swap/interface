import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  item: {
    border: '1px solid transparent',
    padding: theme.spacing(2, 3),
    backgroundColor: '#fff',
    borderRadius: 8,
    height: 92,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  icon: {
    marginRight: theme.spacing(2.5),
    width: 'auto',
    height: 40
  },
  label: {
    textTransform: 'capitalize'
  }
}))
