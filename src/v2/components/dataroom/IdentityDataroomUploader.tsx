import React from 'react'
import { TypedFieldRenderComponentProps } from 'v2/components/form/types'
import { DataroomFile } from 'v2/types/dataroomFile'
import { DataroomRowUploader } from 'v2/components/dataroom/DataroomRowUploader'

export interface IdentityDataroomUploaderProps
  extends TypedFieldRenderComponentProps<DataroomFile> {}

export const IdentityDataroomUploader = (
  props: IdentityDataroomUploaderProps
) => {
  const { value, control, name } = props
  const handleDelete = () => {
    control.setValue(name, {
      type: value.title,
      title: value.title
    })
  }

  return (
    <DataroomRowUploader
      {...props}
      value={value}
      onDelete={handleDelete}
      documentInfo={{
        type: value.title,
        title: value.title
      }}
    />
  )
}
