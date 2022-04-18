import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    background:
      theme.palette.mode === 'light'
        ? `linear-gradient(180deg, rgba(237, 242, 250, 0) 98.71%, ${theme.palette.secondary.light} 98.71%), ${theme.palette.backgrounds.light}`
        : '#152d5f',
    height: 80,
    border: 'none',
    left: 0,
    right: 'auto'
  },
  toolbar: {
    height: 80
  },
  emptySpace: {
    flexGrow: 1
  }
}))
