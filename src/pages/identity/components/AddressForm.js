// @flow
import React from 'react';
import { MenuItem } from '@material-ui/core';
import { COUNTRIES_OPTS } from 'const/const';
import IdentityField from './IdentityField';
import type { IdentityAddress } from '../modules/types';

const AddressForm = ({
  address = {},
  rootName = 'address',
}: {
  address?: IdentityAddress,
  rootName?: 'address' | 'companyAddress',
}) => (
  <>
    <IdentityField
      name={`${rootName}.line1`}
      label="Line 1"
      value={address.line1}
      size={6}
      required
    />
    <IdentityField
      name={`${rootName}.line2`}
      label="Line 2"
      value={address.line2}
      size={6}
    />
    <IdentityField
      name={`${rootName}.city`}
      label="City"
      value={address.city}
      required
    />
    <IdentityField
      name={`${rootName}.state`}
      label="State"
      value={address.state}
    />
    <IdentityField
      name={`${rootName}.country`}
      label="Country"
      value={address.country}
      required
      type="select"
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
);

export default AddressForm;
