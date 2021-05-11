import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  container: {
    position: 'relative',
    width: '100%',
    maxWidth: 347
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    top: 100,
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30
  },
  labelContainer: {
    position: 'absolute',
    left: 0,
    bottom: 20,
    paddingLeft: 30,
    paddingRight: 30
  },
  labelText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 500
  }
}))
