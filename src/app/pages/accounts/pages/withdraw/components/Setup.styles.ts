import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  container: {
    minWidth: 608,
    borderRadius: 2,
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      minWidth: '100%',
      display: 'flex',
      padding: theme.spacing(0, 2),
      justifyContent: 'center',
      background: 'transparent',
      alignItems: 'center'
    }
  },
  separator: {
    height: 1,
    background: '#DBE2EC',
    margin: theme.spacing(4, 3),
    display: 'none',
    [theme.breakpoints.down('sm')]: {
      display: 'block'
    }
  },
  selectRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: theme.spacing(1.25),
    alignItems: 'start',
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
      rowGap: theme.spacing(0.5)
    }
  }
}))
