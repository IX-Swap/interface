import { Container } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

export const RootContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(5)
}))
