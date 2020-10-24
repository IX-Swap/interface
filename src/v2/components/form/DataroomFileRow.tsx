import React from 'react'
import { NewDataroomUploaderRenderProps } from 'v2/components/form/NewDataroomUploader'
import { Button, ButtonGroup } from '@material-ui/core'
import { DownloadDocument } from 'v2/app/pages/identity/components/dataroom/DownloadDocument'
import { DataroomEditRow } from 'v2/app/pages/identity/components/dataroom/DataroomEditRow'

export interface DataroomFileRowProps extends NewDataroomUploaderRenderProps {
  disableBorder?: boolean
}

export const DataroomFileRow = (props: DataroomFileRowProps) => {
  const {
    disableBorder = false,
    handleUpload,
    handleDelete,
    value: document
  } = props

  if (document?._id === undefined || document?._id === '') {
    return (
      <DataroomEditRow
        input={
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
        title={document?.title ?? ''}
        document={document}
        disableBorder={disableBorder}
      />
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
          title={document.title}
          document={document}
          disableBorder={disableBorder}
        />
      )}
    </DownloadDocument>
  )
}
