import withStyles from '@mui/styles/withStyles'
import { ToggleButtonGroup } from '@mui/material'

export const StyledToggleButtonGroup = withStyles(theme => ({
  grouped: {
    margin: 0,
    border: 'none',
    backgroundColor: '#EEF5FF',
    color: theme.palette.grey[700],
    '&.MuiToggleButton-root': {
      backgroundColor: '#EEF5FF',
      width: 90
    },
    '&.Mui-selected': {
      boxShadow: 'none',
      backgroundColor: '#C4D1FF',
      color: '#141272',
      '&:hover': {
        backgroundColor: '#C4D1FF'
      }
    }
  }
}))(ToggleButtonGroup)
