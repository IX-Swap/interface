import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    width: 6,
    height: 6,
    background: ({ isUnread }: { isUnread: boolean }) =>
      isUnread ? theme.palette.error.main : '#DBE2EC',
    minWidth: 0,
    padding: 0
  }
}))
