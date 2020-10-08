import React, { PropsWithChildren } from 'react'
import { Box } from '@material-ui/core'
import { Property } from 'csstype'

export interface DisplayNoneProps {
  when: boolean
  display?: Property.Display
}

export const DisplayNone = (props: PropsWithChildren<DisplayNoneProps>) => {
  const { when, display = 'block', children } = props

  return <Box style={{ display: when ? 'none' : display }}>{children}</Box>
}
