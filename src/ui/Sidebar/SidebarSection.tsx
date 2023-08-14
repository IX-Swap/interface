import { styled } from '@mui/material/styles'
import { Box } from '@mui/material'

interface SidebarSectionProps {
  padded?: boolean
  hasBorder?: boolean
}

export const SidebarSection = styled(Box)<SidebarSectionProps>(
  ({ theme, padded, hasBorder = false }) => ({
    marginBottom: theme.spacing(3),
    paddingLeft: padded === true ? theme.spacing(3) : 0,
    paddingRight: padded === true ? theme.spacing(3) : 0,
    borderBottom: hasBorder ? 'solid 1px #DBE2EC' : 0
  })
)
