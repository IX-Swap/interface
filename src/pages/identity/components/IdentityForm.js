import React from 'react';
import moment from 'moment';
import { MenuItem } from '@material-ui/core';
import { GENDERS_OPTS, MARITAL_STATUSES_OPTS } from 'const/const';
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
    <IdentityField
      name="dob"
      label="Date of Birth"
      type="date"
      value={identity.dob ? moment(identity.dob).format('MM/DD/YYYY') : ''}
    />
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
    <IdentityField name="email" label="Email" value={identity.email} />
    <IdentityField
      name="contactNumber"
      label="Contact Number"
      value={identity.contactNumber}
    />
    <IdentityField
      name="gender"
      label="Gender"
      value={identity.gender}
      type="select"
    >
      <MenuItem disabled value={undefined}>
        Gender
      </MenuItem>
      {GENDERS_OPTS.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </IdentityField>
    <IdentityField
      name="maritalStatus"
      label="Marital Status"
      value={identity.maritalStatus}
      type="select"
    >
      <MenuItem disabled value={undefined}>
        Marital Status
      </MenuItem>
      {MARITAL_STATUSES_OPTS.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </IdentityField>
  </>
);

export default IdentityForm;
