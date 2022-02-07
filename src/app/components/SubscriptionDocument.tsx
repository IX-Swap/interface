import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DataroomFile } from 'types/dataroomFile'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { DownloadDocument } from 'components/dataroom/DownloadDocument'

export interface SubscriptionDocumentProps {
  document: DataroomFile
}

export const SubscriptionDocument = (props: SubscriptionDocumentProps) => {
  const { document } = props

  return (
    <Grid container direction='column' spacing={4}>
      <Grid item>
        <Typography variant='h3'>Subscription Document</Typography>
      </Grid>

      <Grid item>
        <DataroomHeader />
        <DataroomViewRow
          title='Subscription Document'
          document={document}
          downloader={
            <DownloadDocument
              documentId={document._id}
              ownerId={document.user}
            />
          }
        />
      </Grid>
    </Grid>
  )
}
