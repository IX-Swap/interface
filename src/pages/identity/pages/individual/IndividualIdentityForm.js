// @flow
import React from 'react';
import { forOwn } from 'lodash';
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
import documents from '../../data/documents';

const IndividualIdentityForm = () => {
  const { identity, editMode, dataroom } = useIdentityState();
  const identityDispatch = useIdentityDispatch();
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    const formattedDeclarations = [];
    forOwn(data.declarations, (value, key) => {
      formattedDeclarations.push({ [key]: value });
    });

    createIdentity(
      identityDispatch,
      {
        ...data,
        documents: dataroom,
        declarations: formattedDeclarations,
      },
      'individual'
    );
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormContext {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IdentitySection title="My Identity">
          <IdentityForm identity={identity} useOwnEmail />
        </IdentitySection>

        <IdentitySection title="Address">
          <AddressForm address={identity && identity.address} />
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
            name="walletAddress"
            label="Digital Wallet Address"
            value={
              identity.walletAddress ||
              '0x65356f2ab79dac8a0a930c18a83b214ef9fca6a7' // temporary
            }
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
          <Dataroom documentsList={documents.individual} />
        </IdentitySection>

        <IdentitySection
          title="Declaration & Acknowledgement"
          subtitle="Confirmation"
        >
          <Declaration
            declarations={identity.declarations || declarations.individual}
          />
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

export default IndividualIdentityForm;
