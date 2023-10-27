import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
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
    backgroundColor: theme.palette.paginationItem.borderHover
  },
  disabled: {
    backgroundColor: theme.palette.select.itemBorder
  },
  labelWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%'
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },
  iconWrapper: {
    position: 'relative'
  },
  loaderIcon: {
    position: 'absolute',
    right: '-50px',
    color: theme.palette.tooltip.color,
    opacity: 0.5
  },
  checkIcon: {
    position: 'absolute',
    right: '-50px',
    color: '#3DD08A'
  }
}))
