import { Box, Button } from '@mui/material'
import React from 'react'

export interface SaveDrafButtonProps {
  formId: string
  isLastStep?: boolean
  disabled?: boolean
}

export const SaveDrafButton = ({
  formId,
  disabled = false
}: SaveDrafButtonProps) => {
  return (
    <Box width='100%'>
      <Button
        disabled={disabled}
        fullWidth
        variant='outlined'
        type='submit'
        form={formId}
      >
        Save Draft
      </Button>
    </Box>
  )
}
