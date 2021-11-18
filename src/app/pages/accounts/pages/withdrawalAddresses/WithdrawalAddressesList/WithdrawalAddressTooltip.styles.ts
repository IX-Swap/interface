import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(() => ({
  iconButton: {
    padding: 4,
    '&:hover': {
      borderRadius: 4
    }
  }
}))
