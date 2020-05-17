// @flow
import React from 'react';
import IdentityField from './IdentityField';
import type { Identity } from '../modules/types';

const AddressForm = ({ identity = {} }: { identity?: Identity }) => (
  <>
    <IdentityField
      name="line1"
      label="Line 1"
      value={identity.line1}
      size={6}
    />
    <IdentityField
      name="line2"
      label="Line 2"
      value={identity.line2}
      size={6}
    />
    <IdentityField name="city" label="City" value={identity.city} />
    <IdentityField name="state" label="State" value={identity.state} />
    <IdentityField name="country" label="Country" value={identity.city} />
  </>
);

export default AddressForm;
