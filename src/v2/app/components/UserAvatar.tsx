import React from 'react'
import { documentValueExtractor } from './DSO/utils'
import { Box, IconButton } from '@material-ui/core'
import { PhotoCamera } from '@material-ui/icons'
import { DSOAvatar, DSOAvatarSettingsProps } from './DSO/components/DSOAvatar'
import { useTypedForm } from 'v2/components/form/useTypedForm'

interface UserAvatarProps extends Partial<DSOAvatarSettingsProps> {
  name: string
  isEditing: boolean
  ownerId: string
}

export const UserAvatar = (props: UserAvatarProps) => {
  const { name, isEditing, ownerId, size = 50, variant = 'circle' } = props
  const { EditableField, FormValue } = useTypedForm()

  return (
    <Box position='relative' width={size} height={size}>
      <EditableField
        fieldType='DataroomDocument'
        isEditing={isEditing}
        documentInfo={{
          title: '',
          type: ''
        }}
        label='Logo'
        name={name}
        valueExtractor={documentValueExtractor}
        canDelete={false}
        uploadComponent={
          <IconButton component='span'>
            <PhotoCamera />
          </IconButton>
        }
        viewRenderer={
          <FormValue name={name}>
            {logo => (
              <DSOAvatar
                imageId={logo}
                dsoOwnerId={ownerId}
                size={size}
                variant={variant}
              />
            )}
          </FormValue>
        }
        editRenderer={input => (
          <FormValue name={name}>
            {logo => (
              <DSOAvatar
                imageId={logo}
                dsoOwnerId={ownerId}
                button={input}
                size={size}
                variant={variant}
              />
            )}
          </FormValue>
        )}
      />
    </Box>
  )
}
