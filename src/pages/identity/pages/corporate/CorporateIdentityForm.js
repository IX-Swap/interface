// @flow
import React from 'react';
import { forOwn } from 'lodash';
import { useForm, FormContext } from 'react-hook-form';
import { Button, Grid, MenuItem } from '@material-ui/core';
import { COUNTRIES_OPTS } from 'const/const';
import ArrayForm from 'pages/identity/components/ArrayForm';
import IdentitySection from '../../components/IdentitySection';
import IdentityField from '../../components/IdentityField';
import AddressForm from '../../components/AddressForm';
import Dataroom from '../../components/Dataroom';
import Declaration from '../../components/Declaration';
import declarations from '../../data/declarations';
import { useIdentityState, useIdentityDispatch } from '../../modules';
import { createIdentity } from '../../modules/actions';
import documents from '../../data/documents';

const CorporateIdentityForm = () => {
  const methods = useForm();
  const {
    corporate,
    editMode,
    corporateDataroom: dataroom,
  } = useIdentityState();
  const identityDispatch = useIdentityDispatch();
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
      'corporate'
    );
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormContext {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IdentitySection title="Company Registration">
          <IdentityField
            name="companyLegalName"
            label="Company Name"
            size={6}
            value={corporate.companyLegalName}
          />
          <IdentityField
            name="registrationNumber"
            label="Company Registration Number"
            size={6}
            value={corporate.registrationNumber}
          />
          <IdentityField
            name="countryOfFormation"
            label="Country of Formation"
            size={6}
            value={corporate.countryOfFormation}
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
            name="dateOfIncorporation"
            label="Date of Incorporation"
            size={6}
            value={corporate.dateOfIncorporation}
            type="date"
          />
        </IdentitySection>

        <IdentitySection title="Company Address">
          <AddressForm
            address={corporate.companyAddress}
            rootName="companyAddress"
          />
        </IdentitySection>

        <IdentitySection title="Company Representative">
          <ArrayForm
            editMode={editMode}
            data={corporate.representatives}
            rootName="representatives"
          />
        </IdentitySection>

        <IdentitySection title="Director">
          <ArrayForm
            editMode={editMode}
            data={corporate.directors}
            rootName="directors"
          />
        </IdentitySection>

        <IdentitySection title="Beneficial Owner">
          <ArrayForm
            data={corporate.beneficialOwners}
            editMode={editMode}
            rootName="beneficialOwners"
          />
        </IdentitySection>

        <IdentitySection title="Documents">
          <Dataroom documentsList={documents.corporate} dataroom={dataroom} />
        </IdentitySection>

        <IdentitySection
          title="Declaration & Acknowledgement"
          subtitle="Confirmation"
        >
          <Declaration
            declarations={corporate.declarations || declarations.individual}
          />

          {editMode && (
            <Grid container justify="flex-end">
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          )}
        </IdentitySection>
      </form>
    </FormContext>
  );
};

export default CorporateIdentityForm;
