// @flow
import React from 'react';
import IdentityField from './IdentityField';
import type { IdentityAddress } from '../modules/types';

const AddressForm = ({ address = {} }: { address?: IdentityAddress }) => (
  <>
    <IdentityField
      name="address.line1"
      label="Line 1"
      value={address.line1}
      size={6}
    />
    <IdentityField
      name="address.line2"
      label="Line 2"
      value={address.line2}
      size={6}
    />
    <IdentityField name="address.city" label="City" value={address.city} />
    <IdentityField name="address.state" label="State" value={address.state} />
    <IdentityField
      name="address.country"
      label="Country"
      value={address.city}
    />
  </>
);

export default AddressForm;
