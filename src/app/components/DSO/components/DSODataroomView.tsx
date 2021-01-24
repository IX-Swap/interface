import React from 'react'
import { Grid } from '@material-ui/core'
import { DownloadDSODocument } from 'app/components/DSO/components/DownloadDSODocument'
import { DataroomHeader } from 'components/dataroom/DataroomHeader'
import { DataroomViewRow } from 'components/dataroom/DataroomViewRow'
import { DigitalSecurityOffering } from 'types/dso'
import { FormSectionHeader } from 'app/components/DSO/components/FormSectionHeader'

export interface DSODataroomViewProps {
  dso: DigitalSecurityOffering
}

export const DSODataroomView = (props: DSODataroomViewProps) => {
  const { dso } = props

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <FormSectionHeader title='Documents' />
      </Grid>
      <Grid item>
        <DataroomHeader />
        {dso.documents?.map(document => (
          <DataroomViewRow
            key={document._id}
            title={document.type}
            document={document}
            downloader={
              <DownloadDSODocument dsoId={dso._id} documentId={document._id} />
            }
          />
        ))}
      </Grid>
    </Grid>
  )
}
