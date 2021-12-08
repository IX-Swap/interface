import React from 'react'
import { styled, Theme, withTheme } from '@material-ui/core/styles'
import { Box, BoxProps } from '@material-ui/core'

interface SidebarSectionProps {
  padded?: boolean
  theme: Theme
}

export const SidebarSectionComponent = styled(
  ({ padded, ...props }: SidebarSectionProps & BoxProps) => <Box {...props} />
)({
  marginBottom: ({ theme }: SidebarSectionProps) => theme.spacing(3),
  paddingLeft: ({ theme, padded = false }: SidebarSectionProps) =>
    padded ? theme.spacing(3) : 0,
  paddingRight: ({ theme, padded = false }: SidebarSectionProps) =>
    padded ? theme.spacing(3) : 0
})

export const SidebarSection = withTheme(SidebarSectionComponent)
