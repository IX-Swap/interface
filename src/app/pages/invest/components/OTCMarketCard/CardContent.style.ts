import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  introduction: {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
    maxHeight: '4.5em',
    '& p': { margin: 0 }
  }
}))
