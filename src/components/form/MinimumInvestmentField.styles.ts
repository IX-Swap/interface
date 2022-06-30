import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  fieldContainer: {
    display: 'flex',
    position: 'relative',
    width: '100%'
  },
  capsule: {
    position: 'absolute',
    height: 'fit-content',
    padding: 14,
    top: 30,
    right: 2,
    lineHeight: '100%',
    backgroundColor: theme.palette.backgrounds.lighter,
    borderRadius: '0 8px 8px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2
  }
}))
