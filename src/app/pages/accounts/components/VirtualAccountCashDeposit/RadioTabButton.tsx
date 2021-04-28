import { Tab } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

export const RadioTabButton = withStyles({
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
      borderColor: '#fff',
      backgroundColor: '#FFF',
      marginRight: 10,
      boxShadow: '0 0 0 2px #0C469C'
    }
  },
  selected: {
    '& .MuiTab-wrapper': {
      '&::before': {
        backgroundColor: '#0C469C'
      }
    }
  }
})(Tab)
