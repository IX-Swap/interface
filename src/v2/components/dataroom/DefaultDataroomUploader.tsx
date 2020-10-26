import React from 'react'
import { DataroomUploader } from 'v2/components/dataroom/DataroomUploader'
import { DataroomFileRow } from 'v2/components/dataroom/DataroomFileRow'
import { TypedFieldRenderComponentProps } from 'v2/components/form/types'
import { DataroomFile } from 'v2/types/dataroomFile'
import { UploadDocumentInfo } from 'v2/hooks/useUploadFile'

export interface DefaultDataroomUploaderProps
  extends TypedFieldRenderComponentProps<DataroomFile> {
  documentInfo: UploadDocumentInfo
  onDelete?: () => any
}

export const DefaultDataroomUploader = (
  props: DefaultDataroomUploaderProps
) => {
  const { value, onDelete, documentInfo } = props
  const handleDelete = () => {
    onDelete?.()
  }

  return (
    <DataroomUploader
      {...props}
      value={value}
      render={DataroomFileRow}
      onDelete={handleDelete}
      documentInfo={{
        type: value?.title,
        title: value?.title,
        ...documentInfo
      }}
    />
  )
}
