import React from 'react';
import IdentityField from './IdentityField';

const IdentityForm = () => (
  <>
    <IdentityField label="First Name" value="Mark" />
    <IdentityField label="Middle Name" value="Kevin" />
    <IdentityField label="Last Name" value="King" />
    <IdentityField label="Date of Birth" value="04/01/2020" />
    <IdentityField label="Nationality" value="Singapore" />
    <IdentityField label="Country of Residence" value="Singapore" />
    <IdentityField label="Email" value="mark@ulventech" />
    <IdentityField label="Contact Number" value="0912312412" />
    <IdentityField label="Gender" value="Male" />
    <IdentityField label="Marital Status" value="Single" />
  </>
);

export default IdentityForm;
