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
    top: 0,
    width: '100%',
    padding: '6% 11%',
    height: '100%'
  }
}))
