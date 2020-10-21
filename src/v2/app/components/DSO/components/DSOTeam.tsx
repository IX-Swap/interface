import React, { useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { useDSOForm } from 'v2/app/components/DSO/DSOForm'
import { DSOTeamAddButton } from './DSOTeamAddButton'
import { DSOTeamMember } from 'v2/app/components/DSO/components/DSOTeamMember'
import { useFormContext } from 'react-hook-form'

export interface DSOTeamProps {
  isEditing: boolean
  dsoOwnerId: string
}

export const DSOTeam = (props: DSOTeamProps) => {
  const { isEditing, dsoOwnerId } = props
  const { FieldsArray } = useDSOForm()
  const { watch, reset, setValue } = useFormContext()
  const team = watch('team')

  return (
    <FieldsArray name='team'>
      {({ fields, append, remove }) => {
        // console.log('team', team)
        // console.log('fields', fields)
        return (
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
        )
      }}
    </FieldsArray>
  )
}
