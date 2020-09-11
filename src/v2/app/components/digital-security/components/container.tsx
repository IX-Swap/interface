import React from 'react'
import { Box, Typography } from '@material-ui/core'

const SectionContainer = ({
  children,
  title
}: {
  children: React.ReactNode
  title?: string
}) => (
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

export default SectionContainer
