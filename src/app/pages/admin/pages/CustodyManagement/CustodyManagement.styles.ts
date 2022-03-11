import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  title: {
    paddingBottom: theme.spacing(1)
  },
  listedTokensBlock: {
    width: 'max-content',
    marginTop: 0,
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(2.5)
    }
  },
  firstItem: {
    paddingBottom: 0,
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(3)
    }
  },
  item: {
    padding: theme.spacing(2.5, 0)
  }
}))
