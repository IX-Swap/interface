import React, { Fragment } from 'react'
import { Box, Grid } from '@mui/material'
import { DataroomColumns } from 'components/dataroom/DataroomColumns'
import { DataroomFile } from 'types/dataroomFile'
import { Divider } from 'ui/Divider'
import { DownloadDocument } from 'components/dataroom/DownloadDocument'

export interface DataroomViewRowProps {
  title: string
  document: DataroomFile
  downloader?: JSX.Element
  showDivider?: boolean
}

export const DataroomViewRow = (props: DataroomViewRowProps) => {
  const { document, title, downloader, showDivider = true } = props

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
                documentId={document._id}
                ownerId={document.user}
              />
            )}
          </Box>
        </Grid>
      </Box>
      {showDivider && <Divider />}
    </Fragment>
  )
}
