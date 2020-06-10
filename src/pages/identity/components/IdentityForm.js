// @flow
import React from 'react';
import moment from 'moment';
import { MenuItem } from '@material-ui/core';
import {
  GENDERS_OPTS,
  MARITAL_STATUSES_OPTS,
  COUNTRIES_OPTS,
  NATIONALITIES_OPTS,
} from 'const/const';
import { useUserState } from 'context/user';
import IdentityField from './IdentityField';
import type { Identity } from '../modules/types';

const IdentityForm = ({
  identity = {},
  useOwnEmail = false,
  rootName,
  editMode,
}: {
  identity?: Identity,
  useOwnEmail: boolean,
  rootName?: string,
  editMode: boolean,
}) => {
  const {
    user: { email = '' },
  } = useUserState();

  const getFieldName = (name) => (rootName ? `${rootName}.${name}` : name);

  return (
    <>
      <IdentityField
        name={getFieldName('firstName')}
        label="First Name"
        value={identity.firstName}
        editMode={editMode}
        required
      />
      <IdentityField
        name={getFieldName('middleName')}
        label="Middle Name"
        value={identity.middleName}
        editMode={editMode}
      />
      <IdentityField
        name={getFieldName('lastName')}
        label="Last Name"
        value={identity.lastName}
        editMode={editMode}
        required
      />
      <IdentityField
        name={getFieldName('dob')}
        label="Date of Birth"
        type="date"
        value={identity.dob ? moment(identity.dob).format('MM/DD/YYYY') : ''}
        editMode={editMode}
        required
      />
      <IdentityField
        name={getFieldName('nationality')}
        label="Nationality"
        value={identity.nationality}
        required
        editMode={editMode}
        type="select"
      >
        <MenuItem disabled value={undefined}>
          Nationality
        </MenuItem>
        {NATIONALITIES_OPTS.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </IdentityField>
      <IdentityField
        name={getFieldName('countryOfResidence')}
        label="Country of Residence"
        value={identity.countryOfResidence}
        required
        type="select"
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
      <IdentityField
        name={getFieldName('email')}
        label="Email"
        value={useOwnEmail ? email : identity.email}
        required
        editMode={editMode}
      />
      <IdentityField
        name={getFieldName('contactNumber')}
        label="Contact Number"
        value={identity.contactNumber}
        required
        editMode={editMode}
      />
      <IdentityField
        name={getFieldName('gender')}
        label="Gender"
        value={identity.gender}
        type="select"
        editMode={editMode}
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
        name={getFieldName('maritalStatus')}
        label="Marital Status"
        value={identity.maritalStatus}
        type="select"
        required
        editMode={editMode}
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
