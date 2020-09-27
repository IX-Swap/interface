import React from 'react'
import { useTypedForm } from 'v2/components/form/useTypedForm'
import { DocumentWithGuide } from 'v2/types/document'
import { Button } from '@material-ui/core'
import { DataroomViewRow } from 'v2/app/pages/identity/components/dataroom/DataroomViewRow'
import { DataroomEditRow } from 'v2/app/pages/identity/components/dataroom/DataroomEditRow'

export interface DataroomItemProps {
  isEditing: boolean
  index: number
  document: DocumentWithGuide
  removeItem: (index: number) => any
}

export const DataroomItem: React.FC<DataroomItemProps> = props => {
  const { index, isEditing, document, removeItem } = props
  const { EditableField, FormValue } = useTypedForm<{
    documents: DocumentWithGuide[]
  }>()
  const documentPath = ['documents', index, 'document'] as const
  const defaultValue = document.document
  const title = document.title
  const handleRemoveItem = () => removeItem(index)

  return (
    <EditableField
      isEditing={isEditing}
      fieldType='DocumentUploader'
      defaultValue={defaultValue as any} // TODO: fix type
      title={title}
      label='Upload'
      name={documentPath as any} // TODO: fix type
      onDelete={handleRemoveItem}
      uploadComponent={<Button component='span'>Upload</Button>}
      deleteComponent={<Button component='span'>Delete</Button>}
      formControlProps={{
        fullWidth: false
      }}
      viewRenderer={
        <FormValue name={documentPath}>
          {value => (
            <DataroomViewRow
              document={value === undefined ? defaultValue : value}
              title={title}
            />
          )}
        </FormValue>
      }
      editRenderer={input => (
        <FormValue name={documentPath}>
          {value => (
            <DataroomEditRow
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
