import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    borderRadius: 0,
    flexWrap: 'wrap'
  },
  content: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    height: 352,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(4, 5),
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  secondaryContent: {
    backgroundColor: '#DADADA',
    color:
      theme.palette.mode === 'light'
        ? theme.palette.text.primary
        : theme.palette.getContrastText(theme.palette.text.primary)
  },
  media: {
    height: 352,
    width: '50%',
    backgroundSize: 'cover',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  title: {
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineClamp: 4,
    boxOrient: 'vertical',
    lineHeight: '138%',
    marginBottom: theme.spacing(3)
  },
  description: {
    display: '-webkit-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineClamp: 7,
    boxOrient: 'vertical',
    lineHeight: '138%'
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 'auto',
    textDecoration: 'underline',
    color:
      theme.palette.mode === 'light' ? '#8DC2FF' : theme.palette.text.primary,
    stroke:
      theme.palette.mode === 'light' ? '#8DC2FF' : theme.palette.text.primary,
    textDecorationColor:
      theme.palette.mode === 'light'
        ? '#8DC2FF'
        : `${theme.palette.text.primary}!important`,
    '&:hover': {
      opacity: 0.4
    }
  },
  secondaryLink: {
    color:
      theme.palette.mode === 'light'
        ? '#282730'
        : theme.palette.getContrastText(theme.palette.text.primary),
    stroke:
      theme.palette.mode === 'light'
        ? '#282730'
        : theme.palette.getContrastText(theme.palette.text.primary),
    textDecorationColor:
      theme.palette.mode === 'light'
        ? '#282730'
        : `${theme.palette.getContrastText(
            theme.palette.text.primary
          )}!important`
  },
  linkText: {
    marginRight: theme.spacing(1),
    color: 'inherit'
  },
  fullWidth: {
    width: '100%'
  }
}))
