import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    background:
      theme.palette.mode === 'light'
        ? `linear-gradient(180deg, rgba(237, 242, 250, 0) 98.71%, ${theme.palette.secondary.light} 98.71%), ${theme.palette.backgrounds.light}!important`
        : '#152d5f!important',
    height: 80
  },
  toolbar: {
    height: 80
  },
  emptySpace: {
    flexGrow: 1
  }
}))
