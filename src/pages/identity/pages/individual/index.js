// @flow
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useForm, FormContext } from 'react-hook-form';
import { Button, Grid } from '@material-ui/core';
import IdentitySection from '../../components/IdentitySection';
import IdentityField from '../../components/IdentityField';
import IdentityForm from '../../components/IdentityForm';
import AddressForm from '../../components/AddressForm';
import Dataroom from '../../components/Dataroom';
import Declaration from '../../components/Declaration';
import declarations from '../../data/declarations';
import { useIdentityState, useIdentityDispatch } from '../../modules';
import { createIdentity } from '../../modules/actions';

const individualDocumentsList = [
  {
    title: 'Identification Document',
    label: 'Identification Document',
  },
  {
    title: 'Evidence of Accreditation',
    label: 'Evidence of Accreditation (e.g. bank statement, payslip, tax bill)',
  },
  {
    title: 'Proof of Address',
    label: 'Proof of Address (e.g. utility bill or tenancy agreement)',
  },
  {
    title: 'Marriage Certificate',
    label: 'Marriage Certificate',
  },
  {
    title: 'Other Supporting Documents',
    label: 'Other Supporting Documents',
  },
];

const IdentityProfile = () => {
  const { status, identity, editMode, dataroom } = useIdentityState();
  const identityDispatch = useIdentityDispatch();
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    createIdentity(identityDispatch, { ...data, documents: dataroom });
  };

  if (status === 'INIT') {
    return <Redirect to="/identity" />;
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormContext {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IdentitySection title="My Identity">
          <IdentityForm identity={identity} />
        </IdentitySection>

        <IdentitySection title="Address">
          <AddressForm address={identity.address} />
        </IdentitySection>

        <IdentitySection title="Financials">
          <IdentityField
            name="occupation"
            label="Occupation"
            value={identity.occupation}
          />
          <IdentityField
            name="employer"
            label="Employer"
            value={identity.employer}
          />
          <IdentityField
            name="employmentStatus"
            label="Employment Status"
            value={identity.employmentStatus}
          />
          <IdentityField
            name="industryOfEmployment"
            label="Industry"
            value={identity.industryOfEmployment}
          />
          <IdentityField
            name="annualIncome"
            label="Annual Income"
            value={identity.annualIncome}
          />
          <IdentityField
            name="houseHoldIncome"
            label="Household Income"
            value={identity.houseHoldIncome}
          />
          <IdentityField
            name="sourceOfWealth"
            label="Source of Income"
            value={identity.sourceOfWealth}
          />
          <IdentityField
            name="bankName"
            label="Bank Name"
            value={identity.bankName}
          />
          <IdentityField
            name="bankAccountName"
            label="Name of Bank Account"
            value={identity.bankAccountName}
          />
          <IdentityField
            name="bankAccountNumber"
            label="Bank Account Number"
            value={identity.bankAccountNumber}
          />
        </IdentitySection>

        <IdentitySection title="Documents">
          <Dataroom documentsList={individualDocumentsList} />
        </IdentitySection>

        <IdentitySection
          title="Declaration & Acknowledgement"
          subtitle="Confirmation"
        >
          <Declaration declarations={declarations.individual} />
          {editMode && (
            <Grid container justify="flex-end">
              <Button type="submit">Submit</Button>
            </Grid>
          )}
        </IdentitySection>
      </form>
    </FormContext>
  );
};

export default IdentityProfile;
