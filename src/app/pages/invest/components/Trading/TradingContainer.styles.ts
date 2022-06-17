import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  colorGrid: {
    padding: `0 ${String(theme.spacing(2))}`,
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.background.paper
        : '#292929'
  },
  blockWrapper: {
    width: '100%',
    columnGap: theme.spacing(2),
    boxSizing: 'border-box',
    [theme.breakpoints.up('xs')]: {
      display: 'grid',
      gridTemplateColumns: '243px auto 288px'
    }
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2)
  },
  middleBlock: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(2),
    minHeight: 300
  }
}))
