import React, { PropsWithChildren } from 'react'
import { Box } from '@mui/material'

export interface DisplayNoneProps {
  when: boolean
  display?: 'block' | 'flex'
}

export const DisplayNone = (props: PropsWithChildren<DisplayNoneProps>) => {
  const { when, display = 'block', children } = props

  return <Box style={{ display: when ? 'none' : display }}>{children}</Box>
}
