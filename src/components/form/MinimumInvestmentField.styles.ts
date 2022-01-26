import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  fieldContainer: {
    display: 'flex',
    position: 'relative',
    width: '100%'
  },
  capsule: {
    position: 'absolute',
    height: '100%',
    padding: theme.spacing(2),
    top: 0,
    right: 0,
    lineHeight: '100%',
    backgroundColor: theme.palette.backgrounds.light,
    borderRadius: '0 6px 6px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}))
