import React from 'react'
import { Button } from '@mui/material'
import { DataroomFile } from 'types/dataroomFile'

export interface DocumentNamePreviewButtonProps {
  value?: DataroomFile
}

export const DocumentNamePreviewButton: React.FC<
  DocumentNamePreviewButtonProps
> = ({ value }) => {
  const hasValue = value !== undefined

  return (
    <Button
      variant='contained'
      component='span'
      fullWidth
      style={{ textTransform: 'none' }}
      disableElevation={hasValue}
    >
      {!hasValue
        ? 'Upload Signed Subscription Document'.toUpperCase()
        : value?.originalFileName}
    </Button>
  )
}
