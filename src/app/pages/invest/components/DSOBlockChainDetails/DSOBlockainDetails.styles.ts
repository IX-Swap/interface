import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
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
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: theme.palette.mode === 'light' ? '#f5f5f5' : '#11254C',
    borderRadius: 4,
    borderWidth: 1,
    borderStyle: 'solid',
    flexGrow: 1,
    padding: 8,
    marginRight: 24
  },
  chainLogo: {
    width: 18,
    height: 18
  },
  addToWalletButton: {
    backgroundColor: theme.palette.paginationItem.borderHover,
    border: '0 !important',
    borderRadius: '8px',
    padding: '8px 12px !important',
    color: 'white',

    '&:hover': {
      backgroundColor: theme.palette.primary.light
    }
  }
}))
