import { Box, Typography } from '@material-ui/core'
import { ReactComponent as DocumentIcon } from 'assets/icons/document.svg'
import { useStyles } from 'app/pages/_identity/components/UploadDocumentsForm/FileTypeIcon/FileTypeIcon.styles'
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
