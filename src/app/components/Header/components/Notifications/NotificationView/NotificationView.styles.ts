import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    borderBottom: `1px solid ${
      theme.palette.mode === 'light' ? '#EDF2FA' : '#1D3667'
    }`,
    cursor: 'pointer',

    '&:hover': {
      backgroundColor: theme.palette.notificationsDropdown.bgHover
    }
  },
  inner: {
    padding: theme.spacing(2, 3),
    minHeight: 65,
    flexWrap: 'nowrap'
  },
  content: {
    paddingLeft: theme.spacing(3),
    paddingRight: 0,
    overflow: 'hidden',
    flex: '1 1 0'
  },
  title: {
    marginBottom: theme.spacing(0.75)
  },
  actions: {
    width: 44
  }
}))
