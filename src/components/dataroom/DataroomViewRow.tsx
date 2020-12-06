import React from 'react'
import { TableCell } from '@material-ui/core'
import { DataroomColumns } from 'components/dataroom/DataroomColumns'
import { DownloadDocument } from 'components/dataroom/DownloadDocument'
import { DataroomFile } from 'types/dataroomFile'

export interface DataroomViewRowProps {
  title: string
  document: DataroomFile
  downloader?: JSX.Element
}

export const DataroomViewRow = (props: DataroomViewRowProps) => {
  const { document, title, downloader } = props

  return (
    <>
      <DataroomColumns title={title} document={document} />
      <TableCell align='right'>
        {downloader !== undefined ? (
          downloader
        ) : (
          <DownloadDocument
            documentId={document?._id}
            ownerId={document?.user}
          />
        )}
      </TableCell>
    </>
  )
}
