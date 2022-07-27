import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(1.5, 2.5),
    background: theme.palette.background.paper,
    borderRadius: 8,
    width: 174,
    boxShadow: `0px 80px 80px ${theme.palette.menu.boxShadow}`,
    border: `1px solid ${theme.palette.select.itemBorder}`,
    opacity: 1
  },
  separator: {
    background: theme.palette.select.itemBorder,
    height: 1,
    margin: theme.spacing(1, 0, 1.5, 0)
  }
}))
