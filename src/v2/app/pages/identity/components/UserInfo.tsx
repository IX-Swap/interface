import React from 'react'
import { IdentityProfile } from 'v2/types/identity'
import { Grid } from '@material-ui/core'
import { useTypedForm } from 'v2/components/form/useTypedForm'
import { UserAvatar } from 'v2/app/components/UserAvatar'

export interface IdentityForm {
  useOwnEmail: boolean
  rootPath?: string
  isEditing: boolean
}

const UserInfo = (props: IdentityForm): JSX.Element => {
  const { isEditing, rootPath } = props
  const { EditableField } = useTypedForm<IdentityProfile>()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <UserAvatar name='photo' isEditing={isEditing} ownerId='' />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          root={rootPath}
          name='firstName'
          label='First Name'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          root={rootPath}
          name='middleName'
          label='Middle Name'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          root={rootPath}
          name='lastName'
          label='Last Name'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          isEditing={isEditing}
          root={rootPath}
          name='dob'
          label='Date of Birth'
          fieldType='DatePicker'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='NationalitySelect'
          isEditing={isEditing}
          root={rootPath}
          name='nationality'
          label='Nationality'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='CountrySelect'
          isEditing={isEditing}
          root={rootPath}
          name='countryOfResidence'
          label='Country of Residence'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          root={rootPath}
          name='email'
          label='Email'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          root={rootPath}
          name='contactNumber'
          label='Contact Number'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='GenderSelect'
          isEditing={isEditing}
          root={rootPath}
          name='gender'
          label='Gender'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='MartialStatusSelect'
          isEditing={isEditing}
          root={rootPath}
          name='maritalStatus'
          label='Marital Status'
        />
      </Grid>
    </Grid>
  )
}

export default UserInfo
