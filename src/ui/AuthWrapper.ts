import { Grid } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

export const AuthWrapper = styled(Grid)(({ theme }) => ({
  maxWidth: 730,
  margin: 'auto',
  position: 'relative',
  backgroundColor: theme.palette.backgrounds.main
}))
