import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

export const SidebarTitle = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginBottom: theme.spacing(4)
  },

  ...theme.typography.h6,
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  marginBottom: theme.spacing(2.5)
}))
