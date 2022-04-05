import { Box } from '@mui/material'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { DataroomFile } from 'types/dataroomFile'
import { File } from 'ui/FileUpload/File'

export interface FileListProps {
  name: string
}

export const FileList = ({ name }: FileListProps) => {
  const { watch } = useFormContext()
  const files = watch(name, [])

  if (files.length < 1) {
    return null
  }

  return (
    <>
      {(files as DataroomFile[]).map((file, i) => (
        <Box width='100%' mb={1} key={file._id}>
          <File
            multiple
            isDisplay
            label={file.originalFileName}
            value={file}
            name={name}
          />
        </Box>
      ))}
    </>
  )
}
