import React from 'react'
import { Grid } from '@mui/material'
import { File } from 'ui/FileUpload/File'
import { DataroomFile } from 'types/dataroomFile'

export interface DocumentsSectionProps {
  documents: DataroomFile[]
}

export const DocumentsSection = ({ documents }: DocumentsSectionProps) => {
  return documents.length > 0 ? (
    <>
      {documents.map(file => (
        <Grid item>
          <File label={file.title} value={file} readonly />
        </Grid>
      ))}
    </>
  ) : (
    <Grid item>
      <File
        hasError
        isFileMissed
        label={undefined}
        value={undefined}
        readonly
      />
    </Grid>
  )
}
