import React from 'react'
import { Grid, List } from '@material-ui/core'
import { DataroomHeader } from 'v2/app/pages/identity/components/dataroom/DataroomHeader'
import { DataroomItem } from 'v2/app/pages/identity/components/dataroom/DataroomItem'
import { DataroomAddDocument } from 'v2/app/pages/identity/components/dataroom/DataroomAddDocument'
import { useTypedForm } from 'v2/components/form/useTypedForm'

interface DataRoomProps {
  isEditing: boolean
  editable?: boolean
}

export const noop = () => {}

export const Dataroom = (props: DataRoomProps): JSX.Element => {
  const { isEditing, editable = false } = props
  const { FieldsArray } = useTypedForm()

  return (
    <Grid container direction='column'>
      <List style={{ width: '100%' }}>
        <FieldsArray name='documents'>
          {({ fields, remove, append }) => (
            <>
              {fields.length > 0 && <DataroomHeader />}
              {fields.map((field, index) => (
                <DataroomItem
                  key={field.id}
                  isEditing={isEditing}
                  document={fields[index]}
                  removeItem={editable ? remove : noop}
                  index={index}
                />
              ))}
              {editable && isEditing && <DataroomAddDocument append={append} />}
            </>
          )}
        </FieldsArray>
      </List>
    </Grid>
  )
}
