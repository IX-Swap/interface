import React from 'react';
import IdentityField from './IdentityField';

const AddressForm = () => (
  <>
    <IdentityField label="Line 1" value="Mark" size={6} />
    <IdentityField label="Line 2" value="Kevin" size={6} />
    <IdentityField label="City" value="Singapore" />
    <IdentityField label="State" value="Singapore" />
    <IdentityField label="Country" value="Singapore" />
  </>
);

export default AddressForm;
