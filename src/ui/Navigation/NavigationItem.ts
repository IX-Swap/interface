import { ListItem } from '@mui/material'
import { styled } from '@mui/material/styles'

export const NavigationItem = styled(ListItem)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: 0,

  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(4.375),
    padding: 0
  }
}))
