import React from 'react'
import { Grid } from '@material-ui/core'
import { renderStringToHTML } from 'v2/app/components/DSO/utils'
import { useDSOForm } from 'v2/app/components/DSO/DSOForm'
import { UserAvatar } from '../../UserAvatar'
import { DSOTeamRemoveButton } from './DSOTeamRemoveButton'
import { DSOTeamAddButton } from './DSOTeamAddButton'

export interface DSOTeamProps {
  isEditing: boolean
  dsoOwnerId: string
}

export const DSOTeam = (props: DSOTeamProps) => {
  const { isEditing, dsoOwnerId } = props
  const { FieldsArray, EditableField, FormValue } = useDSOForm()

  return (
    <FieldsArray name='team'>
      {({ fields, append, remove }) => (
        <Grid container direction='column' spacing={4}>
          {fields.map((_field, index) => (
            <Grid
              item
              container
              alignItems='flex-start'
              wrap='nowrap'
              spacing={3}
              key={index}
            >
              <Grid item>
                <UserAvatar
                  name={`team[${index}].photo`}
                  isEditing={isEditing}
                  ownerId={dsoOwnerId}
                  size={270}
                  variant='rounded'
                />
              </Grid>
              <Grid item>
                <EditableField
                  fieldType='TextField'
                  isEditing={isEditing}
                  label='Name'
                  name={['team', index, 'name'] as any} // TODO: fix type
                  formControlProps={{
                    fullWidth: false
                  }}
                />
                <EditableField
                  fieldType='TextField'
                  isEditing={isEditing}
                  label='Position'
                  name={['team', index, 'position'] as any} // TODO: fix type
                  formControlProps={{
                    fullWidth: false
                  }}
                />
                <EditableField
                  fieldType='RichTextEditor'
                  isEditing={isEditing}
                  name={['team', index, 'about'] as any} // TODO: fix type
                  label='About'
                  viewRenderer={
                    <FormValue name={['team', index, 'about'] as any}>
                      {renderStringToHTML}
                    </FormValue>
                  }
                />
              </Grid>
              {isEditing && (
                <Grid item>
                  <DSOTeamRemoveButton remove={remove} index={index} />
                </Grid>
              )}
            </Grid>
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
