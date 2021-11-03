import { DialogTitle } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

export const CenteredDialogTitle = styled(DialogTitle)(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  '& h2': {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 500
  },
  '& button': {
    position: 'absolute',
    right: theme.spacing(3)
  }
}))
