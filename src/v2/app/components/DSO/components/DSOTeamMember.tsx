import React from 'react'
import { Grid } from '@material-ui/core'
import { UserAvatar } from 'v2/app/components/UserAvatar'
import { renderStringToHTML } from 'v2/app/components/DSO/utils'
import { DSOTeamRemoveButton } from 'v2/app/components/DSO/components/DSOTeamRemoveButton'
import { useTypedForm } from 'v2/components/form/useTypedForm'

export interface DSOTeamMemberProps {
  isEditing: boolean
  fieldId: string
  index: number
  dsoOwnerId: string
  remove: (field: any) => void
  defaultValue: any
}

export const DSOTeamMember = (props: DSOTeamMemberProps) => {
  const { defaultValue, dsoOwnerId, fieldId, index, isEditing, remove } = props
  const { FormValue, EditableField } = useTypedForm()

  return (
    <Grid item container alignItems='flex-start' wrap='nowrap' spacing={3}>
      <Grid item>
        <UserAvatar
          key={fieldId}
          defaultValue={defaultValue?.photo ?? ''}
          name={`team[${index}].photo`}
          isEditing={isEditing}
          ownerId={dsoOwnerId}
          size={120}
          variant='rounded'
        />
      </Grid>
      <Grid item container direction='column' spacing={1}>
        <Grid item container spacing={2}>
          <Grid item>
            <EditableField
              key={fieldId}
              defaultValue={defaultValue?.name ?? ''}
              fieldType='TextField'
              isEditing={isEditing}
              label='Name'
              name={['team', index, 'name'] as any} // TODO: fix type
              formControlProps={{
                fullWidth: false
              }}
            />
          </Grid>
          <Grid item>
            <EditableField
              key={fieldId}
              defaultValue={defaultValue?.position ?? ''}
              fieldType='TextField'
              isEditing={isEditing}
              label='Position'
              name={['team', index, 'position'] as any} // TODO: fix type
              formControlProps={{
                fullWidth: false
              }}
            />
          </Grid>
        </Grid>
        <Grid item>
          <EditableField
            key={fieldId}
            defaultValue={defaultValue?.about ?? ''}
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
      </Grid>
      {isEditing && (
        <Grid item>
          <DSOTeamRemoveButton remove={remove} index={index} />
        </Grid>
      )}
    </Grid>
  )
}
