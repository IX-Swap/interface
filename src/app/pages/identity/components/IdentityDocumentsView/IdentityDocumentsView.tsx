import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DataroomFile } from 'types/dataroomFile'
import { IdentityType } from 'app/pages/identity/utils/shared'
import { FileUpload } from 'ui/FileUpload/FileUpload'

export interface DocumentsViewProps {
  data: DataroomFile[]
  type?: IdentityType
}

export const IdentityDocumentsView = (props: DocumentsViewProps) => {
  const { data: documents } = props
  console.log('test', props)

  return (
    <Grid container spacing={3}>
      {documents.map((document, index) => {
        console.log('dicusdasd', document)
        return (
          <Grid
            item
            key={index}
            sx={{ width: '100%' }}
            container
            spacing={2}
            direction='column'
          >
            <Grid item>
              <Typography>{document.title}</Typography>
            </Grid>
            <Grid item>
              <FileUpload
                label={document.title}
                value={document}
                fullWidth
                maxSize={10}
                name={document.title}
                readonly
              />
            </Grid>
          </Grid>
        )
      })}
    </Grid>
  )
}
