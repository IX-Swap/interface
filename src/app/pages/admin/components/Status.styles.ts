import { makeStyles } from '@material-ui/core/styles'
import { themeColors } from 'themes/colors'

export const useStyles = makeStyles(theme => ({
  default: {
    backgroundColor: '#EAFBFC',
    color: '#999',
    border: `1px solid #999`,
    display: 'flex',
    height: 27,
    alignItems: 'center',
    paddingLeft: theme.spacing(3.5),
    paddingRight: theme.spacing(3.5),
    borderRadius: theme.shape.borderRadius
  },
  success: {
    backgroundColor: 'transparent',
    borderColor: themeColors.success,
    color: themeColors.success
  }
}))
