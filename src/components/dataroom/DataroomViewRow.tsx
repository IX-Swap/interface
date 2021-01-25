import React, { Fragment } from 'react'
import { Box, Grid } from '@material-ui/core'
import { DataroomColumns } from 'components/dataroom/DataroomColumns'
import { DownloadDocument } from 'components/dataroom/DownloadDocument'
import { DataroomFile } from 'types/dataroomFile'
import { Divider } from 'ui/Divider'

export interface DataroomViewRowProps {
  title: string
  document: DataroomFile
  downloader?: JSX.Element
}

export const DataroomViewRow = (props: DataroomViewRowProps) => {
  const { document, title, downloader } = props

  return (
    <Fragment>
      <Box py={1.5} width='100%'>
        <Grid container alignItems='center' wrap='nowrap'>
          <DataroomColumns title={title} document={document} />
          <Box
            display='flex'
            flex='1 1 20%'
            flexWrap='nowrap'
            justifyContent='flex-end'
          >
            {downloader !== undefined ? (
              downloader
            ) : (
              <DownloadDocument
                documentId={document?._id}
                ownerId={document?.user}
              />
            )}
          </Box>
        </Grid>
      </Box>
      <Divider />
    </Fragment>
  )
}
