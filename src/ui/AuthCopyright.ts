import { Typography } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

export const AuthCopyright = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  rigth: 0,
  textAlign: 'center',
  width: '100%',
  padding: theme.spacing(1)
}))
