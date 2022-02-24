import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    background: `linear-gradient(180deg, rgba(237, 242, 250, 0) 98.71%, ${theme.palette.secondary.light} 98.71%), ${theme.palette.backgrounds.light}`
  },
  emptySpace: {
    flexGrow: 1
  }
}))
