import React from 'react'
import { TypedFieldRenderComponentProps } from 'components/form/types'
import { DataroomFile } from 'types/dataroomFile'
import { DataroomRowUploader } from 'components/dataroom/DataroomRowUploader'

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
