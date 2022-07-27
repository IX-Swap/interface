import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  cell: {
    paddingBottom: theme.spacing(1.5),
    paddingRight: 0,
    paddingTop: 8
  },
  card: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    borderRadius: 8
  },
  columns: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    rowGap: theme.spacing(3)
  },
  label: {
    color: theme.palette.text.secondary
  },
  value: {
    fontSize: '14px'
  },
  iconButton: {
    background: theme.palette.button.bgLight
  }
}))
