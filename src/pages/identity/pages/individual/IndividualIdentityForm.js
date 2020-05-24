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
          <IdentityForm identity={identity} useOwnEmail editMode={editMode} />
        </IdentitySection>

        <IdentitySection title="Address">
          <AddressForm
            editMode={editMode}
            address={identity && identity.address}
          />
        </IdentitySection>

        <IdentitySection title="Financials">
          <IdentityField
            editMode={editMode}
            name="occupation"
            label="Occupation"
            value={identity.occupation}
          />
          <IdentityField
            editMode={editMode}
            name="employer"
            label="Employer"
            value={identity.employer}
          />
          <IdentityField
            editMode={editMode}
            name="employmentStatus"
            label="Employment Status"
            value={identity.employmentStatus}
          />
          <IdentityField
            editMode={editMode}
            name="industryOfEmployment"
            label="Industry"
            value={identity.industryOfEmployment}
          />
          <IdentityField
            editMode={editMode}
            name="walletAddress"
            label="Digital Wallet Address"
            value={
              identity.walletAddress ||
              '0x65356f2ab79dac8a0a930c18a83b214ef9fca6a7' // temporary
            }
          />
          <IdentityField
            editMode={editMode}
            name="annualIncome"
            label="Annual Income"
            value={identity.annualIncome}
          />
          <IdentityField
            editMode={editMode}
            name="houseHoldIncome"
            label="Household Income"
            value={identity.houseHoldIncome}
          />
          <IdentityField
            editMode={editMode}
            name="sourceOfWealth"
            label="Source of Income"
            value={identity.sourceOfWealth}
          />
          <IdentityField
            editMode={editMode}
            name="bankName"
            label="Bank Name"
            value={identity.bankName}
          />
          <IdentityField
            editMode={editMode}
            name="bankAccountName"
            label="Name of Bank Account"
            value={identity.bankAccountName}
          />
          <IdentityField
            editMode={editMode}
            name="bankAccountNumber"
            label="Bank Account Number"
            value={identity.bankAccountNumber}
          />
        </IdentitySection>

        <IdentitySection title="Documents">
          <Dataroom documentsList={documents.individual} dataroom={dataroom} />
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
              <Button type="submit" vairant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          )}
        </IdentitySection>
      </form>
    </FormContext>
  );
};

export default IndividualIdentityForm;
