import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    minWidth: 60,
    // TODO It doesn't work, issue with Icon component
    '&:hover': {
      '& svg': {
        fill: '#000000'
      }
    }
  }
}))
