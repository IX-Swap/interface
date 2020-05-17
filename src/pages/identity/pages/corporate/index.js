// @flow
import React from 'react';
import IdentitySection from '../../components/IdentitySection';
import IdentityForm from '../../components/IdentityForm';
import AddressForm from '../../components/AddressForm';
import DocumentsList from '../../components/DocumentsList';
import Declaration from '../../components/Declaration';

const IdentityProfile = () => (
  <>
    <IdentitySection title="Company Registration">Temp</IdentitySection>

    <IdentitySection title="Company Address">
      <AddressForm />
    </IdentitySection>

    <IdentitySection title="Company Representative">
      <IdentityForm />
    </IdentitySection>

    <IdentitySection title="Company Representative">
      <IdentityForm />
    </IdentitySection>

    <IdentitySection title="Director">
      <IdentityForm />
    </IdentitySection>

    <IdentitySection title="Beneficial Owner">
      <IdentityForm />
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
