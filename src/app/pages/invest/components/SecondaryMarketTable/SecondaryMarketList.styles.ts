import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  cell: {
    padding: theme.spacing(2, 0, 0)
  },
  card: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3),
    borderRadius: 8
  },
  columns: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    rowGap: theme.spacing(3),
    columnGap: theme.spacing(2)
  },
  additionalColumns: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    rowGap: theme.spacing(3),
    columnGap: theme.spacing(2)
  },
  label: {
    color: theme.palette.text.secondary
  },
  value: {
    fontSize: 14
  },
  iconButton: {
    background: theme.palette.button.bgLight
  }
}))
