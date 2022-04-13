import { Box, Typography } from '@mui/material'
import React from 'react'

export interface DropzoneAcceptableFilesProps {
  showAcceptable: boolean
  accept: string | string[] | undefined
}

export const DropzoneAcceptableFiles = ({
  showAcceptable,
  accept
}: DropzoneAcceptableFilesProps) => {
  if (!showAcceptable || accept === undefined) {
    return null
  }

  return (
    <>
      <Box pt={1} />
      <Typography
        variant='caption'
        color='textSecondary'
        component='p'
        style={{ fontSize: 14, opacity: 0.5, fontWeight: 400 }}
        textAlign='right'
      >
        File size limit 10 MB
      </Typography>
    </>
  )
}
