import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DataroomFile } from 'types/dataroomFile'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { DownloadDocument } from 'components/dataroom/DownloadDocument'

export interface SupportingDocumentsProps {
  data: DataroomFile[]
}

export const SupportingDocuments = (props: SupportingDocumentsProps) => {
  const { data } = props

  return (
    <Grid container direction='column' spacing={4}>
      <Grid item>
        <Typography variant='h3'>Supporting Documents</Typography>
      </Grid>
      <Grid item container wrap='wrap'>
        {data.map(document => (
          <DataroomViewRow
            key={document._id}
            title={document.type}
            document={document}
            downloader={
              <DownloadDocument
                documentId={document._id}
                ownerId={document.user}
              />
            }
          />
        ))}
      </Grid>
    </Grid>
  )
}
