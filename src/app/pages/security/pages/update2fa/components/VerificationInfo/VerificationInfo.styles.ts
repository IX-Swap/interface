import { makeStyles } from '@mui/styles'

export const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    background: 'rgba(76, 136, 255, 0.05)',
    padding: theme.spacing(2),
    borderRadius: 8,
    //
    border: '1px solid rgba(76, 136, 255, 0.3)',
    maxHeight: 68
  },
  text: {
    marginLeft: theme.spacing(2),
    opacity: 0.5
  }
}))
