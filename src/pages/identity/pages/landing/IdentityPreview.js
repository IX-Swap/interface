// @flow
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm, FormContext } from 'react-hook-form';
import { Button, Grid, Box } from '@material-ui/core';
import { isEmpty } from 'lodash';
import IdentitySection from '../../components/IdentitySection';
import IdentityField from '../../components/IdentityField';
import IdentityForm from '../../components/IdentityForm';
import { useIdentityState, useIdentityDispatch } from '../../modules';
import { toggleEditMode } from '../../modules/actions';

// NOTE: Temporary component should fix/refactor later
const IdentityPreview = () => {
  const methods = useForm();
  const history = useHistory();
  const { identity = {}, corporate = {} } = useIdentityState();
  const dispatch = useIdentityDispatch();

  const { firstName, lastName } = identity;

  const handleCreateCorporate = () => {
    toggleEditMode(dispatch, true);

    history.push('/identity/corporate');
  };

  const handleViewIdentity = () => {
    // change type, populate dataroom
    history.push('/identity/individual');
  };

  const handleViewCorporate = () => {
    // change type, populate dataroom
    history.push('/identity/corporate');
  };

  return (
    <>
      {!isEmpty(identity) && (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FormContext {...methods}>
          <Box position="relative">
            <form onSubmit={() => {}}>
              <IdentitySection title={`${firstName} ${lastName}`}>
                <IdentityForm identity={identity} useOwnEmail />
              </IdentitySection>
            </form>
            <Box position="absolute" right="5em" top="0.8em">
              <Button color="primary" onClick={handleViewIdentity}>
                <b>View</b>
              </Button>
            </Box>
          </Box>
        </FormContext>
      )}

      <Box mt={3} />

      {!isEmpty(corporate) ? (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <FormContext {...methods}>
          <Box position="relative">
            <form onSubmit={() => {}}>
              <IdentitySection title={corporate.companyLegalName}>
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
                />
                <IdentityField
                  name="dateOfIncorporation"
                  label="Date of Incorporation"
                  size={6}
                  value={corporate.dateOfIncorporation}
                  type="date"
                />
              </IdentitySection>
            </form>
            <Box position="absolute" right="5em" top="0.8em">
              <Button color="primary" onClick={handleViewCorporate}>
                <b> View</b>
              </Button>
            </Box>
          </Box>
        </FormContext>
      ) : (
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleCreateCorporate}
        >
          Create Corporate Identiy
        </Button>
      )}
    </>
  );
};

export default IdentityPreview;
