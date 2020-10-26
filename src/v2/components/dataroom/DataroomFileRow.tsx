import React from 'react'
import { DataroomUploaderRenderProps } from 'v2/components/dataroom/DataroomUploader'
import { Button, ButtonGroup } from '@material-ui/core'
import { DownloadDocument } from 'v2/components/dataroom/DownloadDocument'
import { DataroomEditRow } from 'v2/components/dataroom/DataroomEditRow'
import { isDocument } from 'v2/helpers/dataroom'

export interface DataroomFileRowProps extends DataroomUploaderRenderProps {
  disableBorder?: boolean
}

export const DataroomFileRow = (props: DataroomFileRowProps) => {
  const { handleUpload, handleDelete, documentInfo, value: document } = props

  if (!isDocument(document)) {
    return (
      <DataroomEditRow
        title={documentInfo?.title ?? ''}
        document={document}
        actions={
          <Button
            size='small'
            variant='contained'
            color='primary'
            disableElevation
            onClick={handleUpload}
          >
            Upload
          </Button>
        }
      />
    )
  }

  return (
    <DownloadDocument documentId={document._id} ownerId={document.user}>
      {download => (
        <DataroomEditRow
          actions={
            <ButtonGroup size='small' variant='outlined'>
              <Button onClick={download}>Download</Button>
              <Button onClick={handleDelete}>Delete</Button>
            </ButtonGroup>
          }
          title={document.title}
          document={document}
        />
      )}
    </DownloadDocument>
  )
}
