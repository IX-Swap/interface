import React from 'react'
import { List } from '@material-ui/core'
import { useFieldArray } from 'react-hook-form'
import { DataroomHeader } from 'v2/app/pages/identity/components/dataroom/DataroomHeader'
import { DataroomItem } from 'v2/app/pages/identity/components/dataroom/DataroomItem'
import { DocumentWithGuide } from 'v2/types/document'

interface DataRoomProps {
  isEditing: boolean
}

export const Dataroom = (props: DataRoomProps): JSX.Element => {
  const { isEditing } = props
  const { fields } = useFieldArray({
    name: 'documents'
  })

  return (
    <List style={{ width: '100%' }}>
      <DataroomHeader />
      {fields.map((field, index) => {
        const document = fields[index] as DocumentWithGuide

        return (
          <DataroomItem
            key={field.id}
            title={document.title}
            isEditing={isEditing}
            index={index}
          />
        )
      })}
    </List>
  )
}
