import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  footerInfo: {
    backgroundColor: theme.palette.backgrounds.light,
    padding: 24
  },
  tabStyle: {
    '& .Mui-selected': {
      color: '#343A47'
    },
    '& .MuiTabs-indicator': {
      color: 'red',
      maxWidth: 103
    }
  }
}))
