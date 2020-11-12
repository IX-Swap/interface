import React from 'react'
import { Grid } from '@material-ui/core'
import { DataroomColumns } from 'v2/components/dataroom/DataroomColumns'
import { DownloadDocument } from 'v2/components/dataroom/DownloadDocument'
import { DataroomFile } from 'v2/types/dataroomFile'

export interface DataroomViewRowProps {
  title: string
  document: DataroomFile
  downloader?: JSX.Element
}

export const DataroomViewRow = (props: DataroomViewRowProps) => {
  const { document, title, downloader } = props

  return (
    <Grid container alignItems='center'>
      <DataroomColumns title={title} document={document} />
      <Grid container item xs={2} justify='flex-end'>
        {downloader !== undefined ? (
          downloader
        ) : (
          <DownloadDocument
            documentId={document?._id}
            ownerId={document?.user}
          />
        )}
      </Grid>
    </Grid>
  )
}
