import makeStyles from '@mui/styles/makeStyles'

export const useStyles = makeStyles(theme => ({
  tabs: {
    display: 'flex',
    alignItems: 'end',
    zIndex: 5,
    '& button': {
      textTransform: 'capitalize',
      '&[aria-selected="true"]': {
        color: theme.palette.text.primary,
        textTransform: 'capitalize'
      }
    }
  }
}))
