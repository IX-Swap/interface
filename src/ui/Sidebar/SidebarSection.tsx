import React from 'react'
import { styled, Theme } from '@mui/material/styles'
import withTheme from '@mui/styles/withTheme'
import { Box, BoxProps } from '@mui/material'

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
