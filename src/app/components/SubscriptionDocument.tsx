import React from 'react'
import { Grid, Box } from '@mui/material'
import { DataroomFile } from 'types/dataroomFile'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { DownloadDocument } from 'components/dataroom/DownloadDocument'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { FormSectionHeader } from 'ui/FormSectionHeader/FormSectionHeader'

export interface SubscriptionDocumentProps {
  document?: DataroomFile | null
}

export const SubscriptionDocument = (props: SubscriptionDocumentProps) => {
  const { document } = props

  if (document === undefined || document === null) {
    return null
  }

  return (
    <Box mt={2}>
      <FieldContainer>
        <Grid container direction='column' spacing={4}>
          <Grid item>
            <FormSectionHeader title='Subscription Document' />
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
      </FieldContainer>
    </Box>
  )
}
