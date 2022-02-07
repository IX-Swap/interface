import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
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
    marginBottom: theme.spacing(3)
  },
  link: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background:
      theme.palette.mode === 'light'
        ? '#F6F1FF'
        : theme.palette.backgrounds.alternativeLight,
    color: theme.palette.slider.activeBackground,
    borderRadius: 15,
    padding: theme.spacing(2, 3)
  },
  linkText: {
    fontSize: 16
  },
  icon: {
    width: 24,
    height: 24
  }
}))
