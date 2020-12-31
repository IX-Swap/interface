import { Grid } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

export const AuthWrapper = styled(Grid)(({ theme }) => ({
  maxWidth: 340,
  minHeight: '100vh',
  margin: 'auto',
  position: 'relative',
  paddingBottom: theme.spacing(4)
}))
