import { Box, Typography } from '@mui/material'
import { ReactComponent as DocumentIcon } from 'assets/icons/document.svg'
import { useStyles } from 'app/pages/identity/components/UploadDocumentsForm/FileTypeIcon/FileTypeIcon.styles'
import React from 'react'

export interface FileTypeIconProps {
  fileType: string
}

export const FileTypeIcon = ({ fileType }: FileTypeIconProps) => {
  const { container, text } = useStyles()
  return (
    <Box className={container}>
      <DocumentIcon />
      <Typography className={text}>.{fileType}</Typography>
    </Box>
  )
}
