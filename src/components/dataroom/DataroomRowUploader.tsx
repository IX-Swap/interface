import React from 'react'
import { DataroomUploader } from 'components/dataroom/DataroomUploader'
import { DataroomFileRow } from 'components/dataroom/DataroomFileRow'
import { TypedFieldRenderComponentProps } from 'components/form/types'
import { DataroomFile } from 'types/dataroomFile'
import { UploadDocumentInfo } from 'hooks/useUploadFile'

export interface DataroomRowUploaderProps
  extends TypedFieldRenderComponentProps<DataroomFile> {
  documentInfo?: UploadDocumentInfo
  onDelete?: () => any
}

export const DataroomRowUploader = (props: DataroomRowUploaderProps) => {
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
