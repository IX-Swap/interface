import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  showPasswordButton: {
    paddingLeft: 0,
    paddingRight: 0,
    '&:hover': {
      backgroundColor: 'transparent'
    }
  }
}))
