import { makeStyles } from '@material-ui/styles'

export const useStyles = makeStyles(() => ({
  infoGrid: {
    width: '300px',
    alignSelf: 'center',
    textAlign: 'center',
    padding: '10px'
  },
  labels: {
    textAlign: 'left'
  },
  values: {
    textAlign: 'right'
  }
}))
