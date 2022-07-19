import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  paper: {
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    padding: theme.spacing(0, 4.75, 5)
  },
  footerInfo: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1.5, 2),
    border: '1px solid #DBE2EC',
    borderRadius: 8
  },
  tabStyle: {
    '& .Mui-selected': {
      color: theme.palette.dialog.color
    },
    '& .MuiTabs-indicator': {
      maxWidth: 103
    }
  },
  infoMessage: {
    marginBottom: '1rem'
  }
}))
