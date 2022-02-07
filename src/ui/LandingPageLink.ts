import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

export const LandingPageLink = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  position: 'relative',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  },

  [theme.breakpoints.down('md')]: {
    maxWidth: 120,
    maxHeight: 120
  }
}))

LandingPageLink.defaultProps = {
  borderRadius: 4,
  width: 156,
  height: 168
}
