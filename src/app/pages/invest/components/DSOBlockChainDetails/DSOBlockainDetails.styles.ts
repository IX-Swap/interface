import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#11254C',
    borderRadius: 4,
    padding: 8,
    height: 44,
    width: 245,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  address: {
    color: theme.palette.primary.main
  },
  addressBox: {
    display: 'flex',
    gap: 8,
    alignItems: 'center'
  },
  chainLogo: {
    width: 18,
    height: 18
  }
}))
