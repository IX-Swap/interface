import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    color: theme.palette.primary.main,
    display: 'block',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    padding: theme.spacing(2),
    boxSizing: 'border-box'
  },
  disabled: {
    //
    color: '#BEC4CF',
    cursor: 'initial'
  }
}))
