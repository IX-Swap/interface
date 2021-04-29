import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(theme => ({
  container: {
    width: 10,
    height: 10,
    background: ({ isUnread }: { isUnread: boolean }) =>
      isUnread
        ? 'transparent'
        : theme.palette.type === 'light'
        ? 'rgba(0, 0, 0, 0.26)'
        : theme.palette.primary.main,
    minWidth: 0,
    padding: 0
  }
}))
