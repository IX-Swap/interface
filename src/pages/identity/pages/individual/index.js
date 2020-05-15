// @flow
import React from 'react';
import IdentitySection from '../../components/IdentitySection';
import IdentityField from '../../components/IdentityField';
import IdentityForm from '../../components/IdentityForm';
import AddressForm from '../../components/AddressForm';
import DocumentsList from '../../components/DocumentsList';
import Declaration from '../../components/Declaration';

const IdentityProfile = () => (
  <>
    <IdentitySection title="My Identity">
      <IdentityForm />
    </IdentitySection>

    <IdentitySection title="Address">
      <AddressForm />
    </IdentitySection>

    <IdentitySection title="Financials">
      <IdentityField label="Occupation" value="Mark" />
      <IdentityField label="Employer" value="Kevin" />
      <IdentityField label="Employment Status" value="Singapore" />
      <IdentityField label="Industry" value="Singapore" />
      <IdentityField label="Annual Income" value="Singapore" />
      <IdentityField label="Household Income" value="Mark" />
      <IdentityField label="Source of Income" value="Kevin" />
      <IdentityField label="Bank Name" value="Singapore" />
      <IdentityField label="Name of Bank Account" value="Singapore" />
      <IdentityField label="Bank Account Number" value="Singapore" />
    </IdentitySection>

    <IdentitySection title="Documents">
      <DocumentsList />
    </IdentitySection>

    <IdentitySection
      title="Declaration & Acknowledgement"
      subtitle="Confirmation"
    >
      <Declaration />
    </IdentitySection>
  </>
);

export default IdentityProfile;
