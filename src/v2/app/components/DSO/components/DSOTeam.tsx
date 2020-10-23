import React from 'react'
import { Grid } from '@material-ui/core'
import { useDSOForm } from 'v2/app/components/DSO/DSOForm'
import { DSOTeamAddButton } from './DSOTeamAddButton'
import { DSOTeamMember } from 'v2/app/components/DSO/components/DSOTeamMember'

export interface DSOTeamProps {
  isEditing: boolean
  dsoOwnerId: string
}

export const DSOTeam = (props: DSOTeamProps) => {
  const { isEditing, dsoOwnerId } = props
  const { FieldsArray } = useDSOForm()

  return (
    <FieldsArray name='team'>
      {({ fields, append, remove }) => (
        <Grid container direction='column' spacing={4}>
          {fields.map((_field, index) => (
            <DSOTeamMember
              key={_field.id}
              defaultValue={fields[index]}
              dsoOwnerId={dsoOwnerId}
              fieldId={_field.id}
              remove={remove}
              isEditing={isEditing}
              index={index}
            />
          ))}
          {isEditing && (
            <Grid item container justify='flex-end'>
              <DSOTeamAddButton append={append} />
            </Grid>
          )}
        </Grid>
      )}
    </FieldsArray>
  )
}
