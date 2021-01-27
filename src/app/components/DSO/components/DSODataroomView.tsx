import React, { Fragment } from 'react'
import { Grid, Typography } from '@material-ui/core'
import { DownloadDSODocument } from 'app/components/DSO/components/DownloadDSODocument'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { DigitalSecurityOffering } from 'types/dso'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'

export interface DSODataroomViewProps {
  dso: DigitalSecurityOffering
  showTitle?: boolean
}

export const DSODataroomView = (props: DSODataroomViewProps) => {
  const { dso, showTitle = true } = props

  return (
    <Grid container direction='column' spacing={3}>
      {showTitle && (
        <Grid item>
          <FormSectionHeader title='Documents' />
        </Grid>
      )}

      <Grid item>
        <Typography variant='h5'>Subscription Document</Typography>
      </Grid>

      <Grid item>
        {dso.subscriptionDocument !== undefined ? (
          <Fragment>
            <DataroomHeader />
            <DataroomViewRow
              key={dso.subscriptionDocument?._id}
              title='Subscription Document'
              document={dso.subscriptionDocument}
              downloader={
                <DownloadDSODocument
                  dsoId={dso._id}
                  documentId={dso.subscriptionDocument?._id}
                />
              }
            />
          </Fragment>
        ) : (
          <Typography>No subscription document provided</Typography>
        )}
      </Grid>

      <Grid item>
        <Typography variant='h5'>Dataroom</Typography>
      </Grid>

      <Grid item>
        {dso.documents.length > 0 ? (
          <Fragment>
            <DataroomHeader />
            {dso.documents?.map(document => (
              <DataroomViewRow
                key={document._id}
                title={document.type}
                document={document}
                downloader={
                  <DownloadDSODocument
                    dsoId={dso._id}
                    documentId={document._id}
                  />
                }
              />
            ))}
          </Fragment>
        ) : (
          <Typography>No documents uploaded</Typography>
        )}
      </Grid>
    </Grid>
  )
}
