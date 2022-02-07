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

  const acceptedFilesArray = Array.isArray(accept) ? accept : accept.split(',')
  const preparedAcceptedFilesArray = acceptedFilesArray.map(fileType =>
    fileType.replace(/image\/|\./i, '')
  )
  const acceptedFilesString = `${preparedAcceptedFilesArray

    .slice(0, -1)
    .join(', ')} and ${preparedAcceptedFilesArray.slice(-1)[0]}`

  return (
    <>
      <Box pt={1} />
      <Typography
        variant='caption'
        color='textSecondary'
        style={{ fontSize: 14 }}
      >
        Notes: Type of document format supported is {acceptedFilesString}.
        <br />
        File size limit 10 MB.
      </Typography>
    </>
  )
}
