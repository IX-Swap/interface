import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  footerInfo: {
    backgroundColor: theme.palette.background.default,
    padding: 24
  },
  tabStyle: {
    '& .Mui-selected': {
      color: theme.palette.dialog.color
    },
    '& .MuiTabs-indicator': {
      maxWidth: 103
    }
  }
}))
