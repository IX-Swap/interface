import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  iconButton: {
    padding: 4,
    '&:hover': {
      backgroundColor: '#F5EEFF',
      borderRadius: 4
    }
  }
}))
