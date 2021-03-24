import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    width: 10,
    height: 10,
    background: (isUnread: boolean) =>
      isUnread ? theme.palette.backgrounds.tertiary : 'transparent',
    minWidth: 0,
    padding: 0
  }
}))
