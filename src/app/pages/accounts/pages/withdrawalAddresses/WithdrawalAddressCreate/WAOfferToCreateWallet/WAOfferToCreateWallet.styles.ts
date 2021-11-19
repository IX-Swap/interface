import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  text: {
    color: '#666666'
  },
  link: {
    color: theme.palette.slider.activeBackground,
    cursor: 'pointer'
  }
}))
