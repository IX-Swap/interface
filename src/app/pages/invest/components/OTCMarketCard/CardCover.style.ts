import makeStyles from '@mui/styles/makeStyles';

export default makeStyles(theme => ({
  logo: {
    position: 'absolute',
    bottom: -30,
    left: 12,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    filter: 'drop-shadow(0px 4px 4px rgba(68, 68, 68, 0.08))'
  },
  title: {
    fontSize: theme.typography.h5.fontSize,
    fontWeight: theme.typography.h3.fontWeight,
    letterSpacing: 0
  },
  company: {
    fontSize: theme.typography.h6.fontSize,
    fontWeight: theme.typography.h5.fontWeight,
    letterSpacing: 0,
    minHeight: theme.typography.h6.fontSize
  },
  cover: {
    position: 'relative',
    padding: theme.spacing(3),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    marginBottom: 42,
    textAlign: 'center',
    backgroundColor: theme.palette.backgrounds.light
  },
  favorite: {
    position: 'absolute',
    right: 5,
    top: -3
  }
}))
