import React from 'react'
import { Box, Typography } from '@material-ui/core'

export interface DSOContainerProps {
  children: React.ReactNode
  title?: string
}

export const DSOContainer = ({ children, title }: DSOContainerProps) => (
  <Box
    py={2}
    px={4}
    border={1}
    borderColor='#eaeaea'
    height='100%'
    style={{ display: 'flex', flexDirection: 'column' }}
  >
    {title !== undefined && (
      <Box mt={2}>
        <Typography>
          <b>{title}</b>
        </Typography>
      </Box>
    )}
    <Box mt={2} style={{ flexGrow: 1 }}>
      {children}
    </Box>
  </Box>
)
