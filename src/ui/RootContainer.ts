import { Container } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

export const RootContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3)
}))
