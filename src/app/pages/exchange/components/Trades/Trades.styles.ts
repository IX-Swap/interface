import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  tab: {
    color: theme.palette.primary.main,
    padding: 0,
    minWidth: 120,
    '& .MuiTab-wrapper': {
      fontSize: '.85rem'
    }
  }
}))
