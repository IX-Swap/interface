import { Box, Typography } from '@mui/material'
import React from 'react'

export const EvindenceOfAccreditationTooltipContent = () => {
  return (
    <Box p={1}>
      <Typography variant='body2'>
        Evidence of accredited investor status from any other financial
        institution.
      </Typography>
      <Box m={1} />
      <Typography variant='body2'>
        Certification by a practicing lawyer, notary public or certified
        accountant, private banker who has verified any of the above.
      </Typography>
    </Box>
  )
}
