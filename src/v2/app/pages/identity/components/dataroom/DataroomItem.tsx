import React from 'react'
import { useTypedForm } from 'v2/components/form/useTypedForm'
import { DataroomFileWithGuide } from 'v2/types/dataroomFile'
import { DataroomEditComponent, DataroomViewComponent } from './Dataroom'
import { DataroomDocumentProps } from '../../../../../components/form/DataroomDocument'

export interface DataroomItemProps {
  name: string
  isEditing: boolean
  index: number
  document: DataroomFileWithGuide
  removeItem: (index: number) => any
  ViewComponent: DataroomViewComponent
  EditComponent: DataroomEditComponent
  dataroomDocumentProps?: DataroomDocumentProps
}

export const DataroomItem: React.FC<DataroomItemProps> = props => {
  const {
    name,
    index,
    isEditing,
    document,
    removeItem,
    ViewComponent,
    EditComponent,
    dataroomDocumentProps
  } = props
  const { EditableField, FormValue } = useTypedForm()
  const documentPath = [name, index, 'document'] as const
  const defaultValue = document.document
  const title = document.title
  const handleRemoveItem = () => removeItem(index)

  return (
    <EditableField
      {...dataroomDocumentProps}
      documentInfo={{
        ...dataroomDocumentProps?.documentInfo,
        title,
        type: document.type
      }}
      isEditing={isEditing}
      fieldType='DataroomDocument'
      name={documentPath as any} // TODO: fix type
      defaultValue={defaultValue as any} // TODO: fix type
      label='Upload'
      onDelete={handleRemoveItem}
      formControlProps={{
        fullWidth: false
      }}
      viewRenderer={
        <FormValue name={documentPath}>
          {value => (
            <ViewComponent
              document={value === undefined ? defaultValue : value}
              title={title}
            />
          )}
        </FormValue>
      }
      editRenderer={input => (
        <FormValue name={documentPath}>
          {value => (
            <EditComponent
              document={value === undefined ? defaultValue : value}
              title={title}
              input={input}
            />
          )}
        </FormValue>
      )}
    />
  )
}
