// @flow
import React from 'react'
import moment from 'moment'
import { MenuItem } from '@material-ui/core'
import {
  GENDERS_OPTS,
  MARITAL_STATUSES_OPTS,
  COUNTRIES_OPTS,
  NATIONALITIES_OPTS
} from '../const'
import { IdentityProfile } from '../../../../../types/identity'
import EditableField from '../../../../../components/form/editable-field'
import User from '../../../../../types/user'
import { renderMenu } from '../../../../../helpers/rendering'
import { useUserStore } from '../../../../../context/user'

interface IdentityForm {
  identity?: Partial<IdentityProfile> & Partial<{ user: Partial<User> }>
  useOwnEmail: boolean
  rootName?: string
  editMode: boolean
}

const IdentityForm = ({
  identity = { user: {} },
  useOwnEmail = false,
  rootName,
  editMode
}: IdentityForm) => {
  const userState = useUserStore()
  const email = userState.user?.email

  const getFieldName = (name: string) =>
    rootName ? `${rootName}.${name}` : name

  return (
    <>
      <EditableField
        name={getFieldName('firstName')}
        label='First Name'
        value={identity.firstName}
        editMode={editMode}
        required
      />
      <EditableField
        name={getFieldName('middleName')}
        label='Middle Name'
        value={identity.middleName}
        editMode={editMode}
      />
      <EditableField
        name={getFieldName('lastName')}
        label='Last Name'
        value={identity.lastName}
        editMode={editMode}
        required
      />
      <EditableField
        name={getFieldName('dob')}
        label='Date of Birth'
        type='date'
        value={identity.dob ? moment(identity.dob).format('MM/DD/YYYY') : ''}
        editMode={editMode}
        required
      />
      <EditableField
        name={getFieldName('nationality')}
        label='Nationality'
        value={identity.nationality}
        required
        editMode={editMode}
        type='select'
      >
        <MenuItem disabled value={undefined}>
          Nationality
        </MenuItem>
        {renderMenu(NATIONALITIES_OPTS)}
      </EditableField>
      <EditableField
        name={getFieldName('countryOfResidence')}
        label='Country of Residence'
        value={identity.countryOfResidence}
        required
        type='select'
        editMode={editMode}
      >
        <MenuItem disabled value={undefined}>
          Country
        </MenuItem>
        {renderMenu(COUNTRIES_OPTS)}
      </EditableField>
      <EditableField
        name={getFieldName('email')}
        label='Email'
        value={useOwnEmail ? email : identity?.user?.email}
        required
        editMode={editMode}
      />
      <EditableField
        name={getFieldName('contactNumber')}
        label='Contact Number'
        value={identity.contactNumber}
        required
        editMode={editMode}
      />
      <EditableField
        name={getFieldName('gender')}
        label='Gender'
        value={identity.gender}
        type='select'
        editMode={editMode}
        required
      >
        <MenuItem disabled value={undefined}>
          Gender
        </MenuItem>
        {renderMenu(GENDERS_OPTS)}
      </EditableField>
      <EditableField
        name={getFieldName('maritalStatus')}
        label='Marital Status'
        value={identity.maritalStatus}
        type='select'
        required
        editMode={editMode}
      >
        <MenuItem disabled value={undefined}>
          Marital Status
        </MenuItem>
        {renderMenu(MARITAL_STATUSES_OPTS)}
      </EditableField>
    </>
  )
}

export default IdentityForm
