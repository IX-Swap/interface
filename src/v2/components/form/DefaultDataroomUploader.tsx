import React from 'react'
import { NewDataroomUploader } from 'v2/components/form/NewDataroomUploader'
import { DataroomFileRow } from 'v2/components/form/DataroomFileRow'
import { TypedFieldRenderComponentProps } from 'v2/components/form/types'
import { DataroomFile } from 'v2/types/dataroomFile'

export interface DefaultDataroomUploaderProps
  extends TypedFieldRenderComponentProps<DataroomFile> {}

export const DefaultDataroomUploader = (
  props: DefaultDataroomUploaderProps
) => {
  const { value, controllerProps, name } = props
  const handleDelete = () => {
    controllerProps.setValue(name, {
      type: value.title,
      title: value.title
    })
  }

  return (
    <NewDataroomUploader
      {...props}
      value={value}
      render={DataroomFileRow}
      onDelete={handleDelete}
      documentInfo={{
        type: value.title,
        title: value.title
      }}
    />
  )
}
