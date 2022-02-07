import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(() => ({
  container: { position: 'relative' },
  text: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    lineHeight: '44px',
    color: '#8E8EC2',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 'smaller'
  }
}))
