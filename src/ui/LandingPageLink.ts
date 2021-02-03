import { Box } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'

export const LandingPageLink = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  },

  [theme.breakpoints.down('sm')]: {
    maxWidth: 120,
    maxHeight: 120
  }
}))

LandingPageLink.defaultProps = {
  borderRadius: 4,
  width: 156,
  height: 168
}
