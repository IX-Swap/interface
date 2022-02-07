import makeStyles from '@mui/styles/makeStyles'

interface StyleProps {
  invalid: boolean
}

export default makeStyles(theme => ({
  text: {
    color: ({ invalid }: StyleProps) => (invalid ? '#FF8080' : '#53F3A3')
  },
  invalidIcon: {
    fill: '#FF8080'
  },
  validIcon: {
    fill: '#53F3A3'
  }
}))
