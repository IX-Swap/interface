import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  closeIcon: {
    fontSize: 22,
    fontWeight: 600
  },
  contentWrapper: {
    maxWidth: '600px',
    padding: theme.spacing(1, 3)
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
    alignItems: 'center',
    width: '100%',
    background: theme.palette.paginationItem.borderHover,
    color: theme.palette.primary.main,
    borderRadius: '8px',
    padding: theme.spacing(2.5, 3),
    marginBottom: theme.spacing(2)
  },
  linkText: {
    fontSize: 16
  },
  icon: {
    width: 24,
    height: 24
  },
  title: {
    display: 'flex',
    justifyContent: 'center'
  }
}))
