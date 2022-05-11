import { Box, Button, useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/styles'
import React from 'react'

export interface SaveDrafButtonProps {
  formId: string
  isLastStep?: boolean
  disabled?: boolean
}

export const SaveDrafButton = ({
  formId,
  isLastStep = false,
  disabled = false
}: SaveDrafButtonProps) => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      display='flex'
      justifyContent='center'
      width='100%'
      mt={matches ? 1 : 3}
      p={matches ? 0 : '0 40px'}
    >
      <Box width='100%'>
        <Button
          disabled={disabled}
          fullWidth
          variant={isLastStep ? 'contained' : 'outlined'}
          type='submit'
          form={formId}
        >
          {isLastStep ? 'Submit' : 'Save Draft'}
        </Button>
      </Box>
    </Box>
  )
}
