// @flow
import React from 'react'
import { MenuItem } from '@material-ui/core'
import { COUNTRIES_OPTS } from 'const/const'
import IdentityField from './IdentityField'
import type { IdentityAddress } from '../modules/types'

const AddressForm = ({
  address = {},
  rootName = 'address',
  editMode
}: {
  address?: IdentityAddress,
  rootName?: 'address' | 'companyAddress',
  editMode: boolean,
}) => (
  <>
    <IdentityField
      name={`${rootName}.line1`}
      label='Line 1'
      value={address.line1}
      editMode={editMode}
      required
    />
    <IdentityField
      name={`${rootName}.line2`}
      label='Line 2'
      value={address.line2}
      editMode={editMode}
    />
    <IdentityField
      name={`${rootName}.city`}
      label='City'
      value={address.city}
      required
      editMode={editMode}
    />
    <IdentityField
      name={`${rootName}.postalCode`}
      label='Postal Code'
      value={address.postalCode}
      editMode={editMode}
    />
    <IdentityField
      name={`${rootName}.state`}
      label='State'
      value={address.state}
      editMode={editMode}
    />
    <IdentityField
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
      {COUNTRIES_OPTS.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </IdentityField>
  </>
)

export default AddressForm
