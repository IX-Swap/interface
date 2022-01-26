import { DialogTitle } from '@mui/material'
import { styled } from '@mui/material/styles'

export const CenteredDialogTitle = styled(DialogTitle)(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  '& h2': {
    fontSize: theme.typography.h4.fontSize,
    fontWeight: 500
  },
  '& button': {
    position: 'absolute',
    top: 12,
    right: theme.spacing(3)
  }
}))
