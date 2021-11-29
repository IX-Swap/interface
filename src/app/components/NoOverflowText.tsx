import { Box } from '@material-ui/core'
import React from 'react'

export interface NoOverflowTextProps {
  text: string
}

export const NoOverflowText = ({ text }: NoOverflowTextProps) => {
  return (
    <Box
      style={{
        width: '100%',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
      }}
    >
      {text}
    </Box>
  )
}
