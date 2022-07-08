import React from 'react'
import { Grid, Typography } from '@mui/material'
import { DataroomFile } from 'types/dataroomFile'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { DownloadDocument } from 'components/dataroom/DownloadDocument'

export interface SubscriptionDocumentProps {
  document?: DataroomFile | null
}

export const SubscriptionDocument = (props: SubscriptionDocumentProps) => {
  const { document } = props
  if (document === undefined || document === null) {
    return null
  }
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
              name={document.originalFileName}
              ownerId={document.user}
            />
          }
        />
      </Grid>
    </Grid>
  )
}
