import { ListItem } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

export const NavigationItem = styled(ListItem)(({ theme }) => ({
  paddingTop: 0,
  paddingBottom: 0,

  [theme.breakpoints.up('md')]: {
    marginTop: theme.spacing(4.375),
    padding: 0
  }
}))
