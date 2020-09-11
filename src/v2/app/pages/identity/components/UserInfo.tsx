import React from 'react'
import { IdentityProfile } from 'v2/types/identity'
import User from 'v2/types/user'
import { useIndividualIdentityForm } from 'v2/app/pages/identity/components/IndividualIdentityForm'
import { Grid } from '@material-ui/core'

interface IdentityForm {
  identity?: Partial<IdentityProfile> & Partial<{ user: Partial<User> }>
  useOwnEmail: boolean
  rootName?: string
  isEditing: boolean
}

const UserInfo = (props: IdentityForm): JSX.Element => {
  const { isEditing } = props
  const { EditableField } = useIndividualIdentityForm()

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='firstName'
          label='First Name'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='middleName'
          label='Middle Name'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='lastName'
          label='Last Name'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          isEditing={isEditing}
          name='dob'
          label='Date of Birth'
          fieldType='TextField'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='NationalitySelect'
          isEditing={isEditing}
          name='nationality'
          label='Nationality'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='CountrySelect'
          isEditing={isEditing}
          name='countryOfResidence'
          label='Country of Residence'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='email'
          label='Email'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='TextField'
          isEditing={isEditing}
          name='contactNumber'
          label='Contact Number'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='GenderSelect'
          isEditing={isEditing}
          name='gender'
          label='Gender'
        />
      </Grid>
      <Grid item xs={4}>
        <EditableField
          fieldType='MartialStatusSelect'
          isEditing={isEditing}
          name='maritalStatus'
          label='Marital Status'
        />
      </Grid>
    </Grid>
  )
}

export default UserInfo
