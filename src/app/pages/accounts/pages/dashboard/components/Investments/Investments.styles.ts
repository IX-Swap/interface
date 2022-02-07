import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  firstBlock: {
    width: 'initial',
    paddingRight: 0,
    [theme.breakpoints.down('sm')]: {
      width: '50%',
      paddingRight: theme.spacing(2)
    }
  },
  secondBlock: {
    width: 'initial',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      width: '50%'
    },
    [theme.breakpoints.down('lg')]: {
      flexDirection: 'column'
    }
  },
  item: {
    flexWrap: 'nowrap',
    [theme.breakpoints.down('md')]: {
      flexWrap: 'wrap'
    }
  },
  label: {
    fontWeight: 600,
    whiteSpace: 'nowrap'
  },
  value: {
    whiteSpace: 'nowrap'
  },
  space: {
    width: theme.spacing(3)
  }
}))
