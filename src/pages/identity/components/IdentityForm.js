import React from 'react';
import moment from 'moment';
import { MenuItem } from '@material-ui/core';
import {
  GENDERS_OPTS,
  MARITAL_STATUSES_OPTS,
  COUNTRIES_OPTS,
} from 'const/const';
import { useUserState } from 'context/user';
import IdentityField from './IdentityField';
import Identity from '../modules/types';

const IdentityForm = ({
  identity = {},
  useOwnEmail = false,
}: {
  identity?: Identity,
  useOwnEmail: boolean,
}) => {
  const {
    user: { email },
  } = useUserState();

  return (
    <>
      <IdentityField
        name="firstName"
        label="First Name"
        value={identity.firstName}
        required
      />
      <IdentityField
        name="middleName"
        label="Middle Name"
        value={identity.middleName}
        required
      />
      <IdentityField
        name="lastName"
        label="Last Name"
        value={identity.lastName}
        required
      />
      <IdentityField
        name="dob"
        label="Date of Birth"
        type="date"
        value={identity.dob ? moment(identity.dob).format('MM/DD/YYYY') : ''}
        required
      />
      <IdentityField
        name="nationality"
        label="Nationality"
        value={identity.nationality}
        required
      />
      <IdentityField
        name="countryOfResidence"
        label="Country of Residence"
        value={identity.countryOfResidence}
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
      <IdentityField
        name="email"
        label="Email"
        value={useOwnEmail ? email : identity.email}
        disabled={useOwnEmail}
        required
      />
      <IdentityField
        name="contactNumber"
        label="Contact Number"
        value={identity.contactNumber}
        required
      />
      <IdentityField
        name="gender"
        label="Gender"
        value={identity.gender}
        type="select"
        required
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
        required
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
};

export default IdentityForm;
