import React from 'react'
import { Box, BoxProps } from '@mui/material'
import { styled, Theme } from '@mui/material/styles'

import withTheme from '@mui/styles/withTheme'

export interface DividerProps extends BoxProps {
  theme: Theme
  vertical?: boolean
}

const DividerComponent = styled(({ vertical, ...otherProps }: DividerProps) => (
  <Box {...otherProps} />
))({
  width: (props: DividerProps) =>
    props.vertical === true ? props.width ?? 1 : props.width ?? '100%',
  height: (props: DividerProps) =>
    props.vertical === true ? props.height ?? '100%' : props.height ?? 1,
  backgroundColor: (props: DividerProps) => props.theme.palette.divider
})

export const Divider = withTheme(DividerComponent)
