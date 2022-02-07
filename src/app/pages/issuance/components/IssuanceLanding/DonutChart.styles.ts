import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(_theme => ({
  percent: {
    position: 'absolute',
    display: 'block',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 9
  },
  percentNew: {
    fontSize: 14,
    color: '#F5BD25'
  }
}))
