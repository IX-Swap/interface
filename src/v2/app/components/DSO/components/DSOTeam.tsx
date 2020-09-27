import React from 'react'
import { Button, Grid, IconButton } from '@material-ui/core'
import {
  documentValueExtractor,
  renderStringToHTML
} from 'v2/app/components/DSO/utils'
import { DSOAvatar } from 'v2/app/components/DSO/components/DSOAvatar'
import { PhotoCamera } from '@material-ui/icons'
import { useDSOForm } from 'v2/app/components/DSO/DSOForm'

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
          {fields.map((field, index) => (
            <Grid
              item
              container
              alignItems='flex-start'
              wrap='nowrap'
              spacing={3}
            >
              <Grid item>
                <EditableField
                  fieldType='DocumentUploader'
                  isEditing={isEditing}
                  title='Team Member photo'
                  label='Photo'
                  name={['team', index, 'photo'] as any} // TODO: fix type
                  valueExtractor={documentValueExtractor}
                  canDelete={false}
                  uploadComponent={
                    <IconButton component='span'>
                      <PhotoCamera />
                    </IconButton>
                  }
                  viewRenderer={
                    <FormValue name={['team', index, 'photo'] as any}>
                      {photo => (
                        <DSOAvatar
                          imageId={photo}
                          dsoOwnerId={dsoOwnerId}
                          size={270}
                          variant='rounded'
                        />
                      )}
                    </FormValue>
                  }
                  editRenderer={button => (
                    <FormValue name={['team', index, 'photo'] as any}>
                      {photo => (
                        <DSOAvatar
                          imageId={photo}
                          dsoOwnerId={dsoOwnerId}
                          button={button}
                          size={270}
                          variant='rounded'
                        />
                      )}
                    </FormValue>
                  )}
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
                  <Button onClick={() => remove(index)}>Remove</Button>
                </Grid>
              )}
            </Grid>
          ))}
          {isEditing && (
            <Grid item container justify='flex-end'>
              <Button
                color='primary'
                variant={'contained'}
                onClick={() => append({})}
              >
                Add Team Member
              </Button>
            </Grid>
          )}
        </Grid>
      )}
    </FieldsArray>
  )
}
