import { Container } from '@mui/material'
import { styled } from '@mui/material/styles'

export const RootContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(3)
}))
