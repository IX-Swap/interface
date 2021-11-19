import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  title: {
    position: 'relative',
    margin: 0,
    padding: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    textAlign: 'center',
    fontWeight: 600,
    fontSize: 16
  },
  closeBtn: {
    position: 'absolute',
    right: 12,
    top: 12
  },
  closeIcon: {
    fontSize: 22,
    fontWeight: 600
  },
  contentWrapper: {
    padding: theme.spacing(1, 3, 5)
  },
  content: {
    background: theme.palette.backgrounds.light,
    border: `1px solid ${theme.palette.divider}`,
    boxSizing: 'border-box',
    borderRadius: 15,
    padding: theme.spacing(2, 3),
    fontSize: 14,
    lineHeight: '21px',
    color: '#666666',
    marginBottom: theme.spacing(3)
  },
  link: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#F6F1FF',
    borderRadius: 15,
    padding: theme.spacing(2, 3)
  },
  linkText: {
    fontSize: 16,
    color: theme.palette.slider.activeBackground
  },
  icon: {
    width: 24,
    height: 24
  }
}))
