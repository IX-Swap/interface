import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: theme.spacing(1.25)
  },
  button: {
    paddingTop: theme.spacing(1.25),
    paddingBottom: theme.spacing(1.25),
    borderRadius: 8,
    paddingLeft: theme.spacing(2),
    border: `1px solid ${theme.palette.select.itemBorder}`,
    backgroundColor: 'inherit',
    cursor: 'pointer'
  },
  active: {
    border: `1px solid ${theme.palette.primary.main}`,
    // backgroundColor: 'rgba(76, 136, 255, 0.16)'
    backgroundColor: theme.palette.paginationItem.borderHover
  },
  disabled: {
    backgroundColor: theme.palette.select.itemBorder
  }
}))
