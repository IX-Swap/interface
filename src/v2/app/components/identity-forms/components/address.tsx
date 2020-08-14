// @flow
import React from 'react'
import { MenuItem } from '@material-ui/core'
import { COUNTRIES_OPTS } from '../const'
import EditableField from '../../../../components/form/editable-field'
import { IdentityAddress } from '../../../../types/identity'
import { renderMenu } from '../../../../helpers/rendering'

const AddressForm = ({
  address = {},
  rootName = 'address',
  editMode
}: {
  address?: Partial<IdentityAddress>
  rootName?: 'address' | 'companyAddress'
  editMode: boolean
}) => (
  <>
    <EditableField
      name={`${rootName}.line1`}
      label='Line 1'
      value={address.line1}
      editMode={editMode}
      required
    />
    <EditableField
      name={`${rootName}.line2`}
      label='Line 2'
      value={address.line2}
      editMode={editMode}
    />
    <EditableField
      name={`${rootName}.city`}
      label='City'
      value={address.city}
      required
      editMode={editMode}
    />
    <EditableField
      name={`${rootName}.postalCode`}
      label='Postal Code'
      value={address.postalCode}
      editMode={editMode}
    />
    <EditableField
      name={`${rootName}.state`}
      label='State'
      value={address.state}
      editMode={editMode}
    />
    <EditableField
      name={`${rootName}.country`}
      label='Country'
      value={address.country}
      required
      type='select'
      editMode={editMode}
    >
      <MenuItem disabled value={undefined}>
        Country
      </MenuItem>
      {renderMenu(COUNTRIES_OPTS)}
    </EditableField>
  </>
)

export default AddressForm
