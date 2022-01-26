import { Tab } from '@mui/material'
import withStyles from '@mui/styles/withStyles'

export const RadioTabButton = withStyles(theme => ({
  root: {
    minWidth: 'auto',
    paddingLeft: 2,
    paddingRight: 20,
    cursor: 'pointer'
  },
  wrapper: {
    fontSize: 14,
    flexDirection: 'row',
    '&::before': {
      display: 'block',
      content: '""',
      width: 16,
      height: 16,
      borderRadius: 10,
      borderWidth: 3,
      borderStyle: 'solid',
      borderColor: theme.palette.backgrounds.default,
      backgroundColor: theme.palette.backgrounds.default,
      marginRight: 10,
      boxShadow: `0 0 0 2px ${theme.palette.primary.main as string}`
    }
  },
  selected: {
    '& .MuiTab-wrapper': {
      '&::before': {
        backgroundColor: theme.palette.primary.main
      }
    }
  }
}))(Tab)
