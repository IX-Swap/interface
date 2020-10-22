import React from 'react'
import { NewDataroomUploaderRenderProps } from 'v2/components/form/NewDataroomUploader'
import { Button, ButtonGroup } from '@material-ui/core'
import { DownloadDocument } from 'v2/app/pages/identity/components/dataroom/DownloadDocument'
import { DataroomEditRow } from 'v2/app/pages/identity/components/dataroom/DataroomEditRow'

export interface DataroomFileRowProps extends NewDataroomUploaderRenderProps {}

export const DataroomFileRow = (props: DataroomFileRowProps) => {
  const { handleUpload, handleDelete, value: document } = props

  if (document === undefined || document === null) {
    return (
      <Button onClick={handleUpload} variant='contained' color='primary'>
        Upload
      </Button>
    )
  }

  return (
    <DownloadDocument documentId={document._id} ownerId={document.user}>
      {download => (
        <DataroomEditRow
          input={
            <ButtonGroup size='small' variant='outlined'>
              <Button onClick={download}>Download</Button>
              <Button onClick={handleDelete}>Delete</Button>
            </ButtonGroup>
          }
          title={document.type}
          document={document}
          disableBorder
        />
      )}
    </DownloadDocument>
  )
}
