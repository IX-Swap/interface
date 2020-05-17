import React from 'react';
import IdentityField from './IdentityField';
import Identity from '../modules/types';

const IdentityForm = ({ identity = {} }: { identity?: Identity }) => (
  <>
    <IdentityField
      name="firstName"
      label="First Name"
      value={identity.firstName}
    />
    <IdentityField
      name="middleName"
      label="Middle Name"
      value={identity.middleName}
    />
    <IdentityField
      name="lastName"
      label="Last Name"
      value={identity.lastName}
    />
    <IdentityField name="dob" label="Date of Birth" value={identity.dob} />
    <IdentityField
      name="nationality"
      label="Nationality"
      value={identity.nationality}
    />
    <IdentityField
      name="countryOfResidence"
      label="Country of Residence"
      value={identity.countryOfResidence}
    />
    <IdentityField label="Email" value={identity.email} />
    <IdentityField
      name="contactNumber"
      label="Contact Number"
      value={identity.contactNumber}
    />
    <IdentityField name="gender" label="Gender" value={identity.gender} />
    <IdentityField
      name="maritalStatus"
      label="Marital Status"
      value={identity.maritalStatus}
    />
  </>
);

export default IdentityForm;
