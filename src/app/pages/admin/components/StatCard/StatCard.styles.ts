import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(() => ({
  root: { minWidth: 232 },
  content: {
    padding: 13,
    '&:last-child': {
      paddingBottom: 13
    }
  },
  title: {
    fontWeight: 'bold'
  },
  titleIcon: {
    height: 35
  }
}))
