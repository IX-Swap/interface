// @flow
import React, { useEffect } from 'react';
import { forOwn } from 'lodash';
import { useForm, FormContext } from 'react-hook-form';
import { Button, Grid, MenuItem } from '@material-ui/core';
import { COUNTRIES_OPTS } from 'const/const';
import { snackbarService } from 'uno-material-ui';
import ArrayForm from 'pages/identity/components/ArrayForm';
import IdentitySection from '../../components/IdentitySection';
import IdentityField from '../../components/IdentityField';
import AddressForm from '../../components/AddressForm';
import Dataroom from '../../components/Dataroom';
import Declaration from '../../components/Declaration';
import declarations from '../../data/declarations';
import type { Identity, Document } from '../../modules/types';
import documents from '../../data/documents';

const CorporateIdentityForm = ({
  corporate,
  editMode,
  dataroom,
  handleCreateIdentity,
  onCancelEdit,
}: {
  corporate: Identity,
  editMode: boolean,
  dataroom: Document[],
  handleCreateIdentity?: Function,
  onCancelEdit?: Function,
}) => {
  const methods = useForm();

  const { handleSubmit, errors } = methods;

  const onSubmit = (data: any) => {
    const formattedDeclarations = [];
    forOwn(data.declarations, (value, key) => {
      formattedDeclarations.push({ [key]: value });
    });

    if (handleCreateIdentity) {
      handleCreateIdentity({
        ...data,
        documents: dataroom,
        declarations: formattedDeclarations,
      });
    }
  };

  useEffect(() => {
    if (Object.keys(errors).length) {
      snackbarService.showSnackbar(
        'Make sure all fields are filled out and declarations are checked',
        'error'
      );
    }
  }, [errors]);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormContext {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <IdentitySection title="Company Registration">
          <IdentityField
            name="companyLegalName"
            label="Company Name"
            size={6}
            editMode={editMode}
            value={corporate.companyLegalName}
          />
          <IdentityField
            name="registrationNumber"
            label="Company Registration Number"
            size={6}
            value={corporate.registrationNumber}
            editMode={editMode}
          />
          <IdentityField
            name="countryOfFormation"
            label="Country of Formation"
            size={6}
            value={corporate.countryOfFormation}
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
            name="dateOfIncorporation"
            label="Date of Incorporation"
            size={6}
            value={corporate.dateOfIncorporation}
            type="date"
            editMode={editMode}
          />
          <IdentityField
            editMode={editMode}
            name="walletAddress"
            label="Digital Wallet Address"
            value={corporate.walletAddress || ''}
          />
        </IdentitySection>

        <IdentitySection title="Company Address">
          <AddressForm
            address={corporate.companyAddress}
            rootName="companyAddress"
            editMode={editMode}
          />
        </IdentitySection>

        <IdentitySection title="Company Representative">
          <ArrayForm
            editMode={editMode}
            data={corporate.representatives}
            rootName="representatives"
          />

          <IdentityField
            editMode={editMode}
            name="toArrangeCustody"
            label="I would like InvestaX to arrange digital security custody"
            type="check"
            size={12}
            value={corporate.toArrangeCustody}
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
            editMode={editMode}
            declarations={corporate.declarations || declarations.corporate}
          />

          {editMode && (
            <Grid container justify="flex-end" spacing={2}>
              {corporate && (
                <Grid item>
                  <Button
                    type="button"
                    variant="contained"
                    color="default"
                    onClick={onCancelEdit}
                  >
                    Cancel
                  </Button>
                </Grid>
              )}

              <Grid item>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          )}
        </IdentitySection>
      </form>
    </FormContext>
  );
};

export default CorporateIdentityForm;
