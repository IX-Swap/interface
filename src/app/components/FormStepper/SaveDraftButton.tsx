import { Box, Button } from '@mui/material'
import React from 'react'

export interface SaveDraftButtonProps {
  formId: string
  isLastStep?: boolean
  disabled?: boolean
}

export const SaveDraftButton = ({
  formId,
  disabled = false
}: SaveDraftButtonProps) => {
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
