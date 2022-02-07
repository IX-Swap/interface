import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    width: 145,
    height: 145,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 25,
    paddingTop: 25,
    borderRadius: 14,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'transparent',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      borderColor: theme.palette.divider,
      cursor: 'pointer'
    }
  },
  iconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
    width: 56,
    height: 56,
    borderRadius: 9
  },
  label: {
    textAlign: 'center'
  }
}))
