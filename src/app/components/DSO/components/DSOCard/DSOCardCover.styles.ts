import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  introduction: {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-line-clamp': '3',
    '-webkit-box-orient': 'vertical',
    maxHeight: '4.5em',
    '& p': { margin: 0 }
  },
  logo: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider
  },
  title: {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    letterSpacing: 0
  },
  cover: {
    overflow: 'hidden',
    maxWidth: 205,
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: theme.palette.backgrounds.secondary
  }
}))
