// @flow
import React from 'react';
import { useForm, FormContext } from 'react-hook-form';
import IdentitySection from '../../components/IdentitySection';
import IdentityForm from '../../components/IdentityForm';
import AddressForm from '../../components/AddressForm';
import Dataroom from '../../components/Dataroom';
import Declaration from '../../components/Declaration';

const IdentityProfile = () => {
  const methods = useForm();
  const { handleSubmit } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
    // createIdentity(identityDispatch, data);
  };

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FormContext {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
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
          <Dataroom documentsList={[]} />
        </IdentitySection>

        <IdentitySection
          title="Declaration & Acknowledgement"
          subtitle="Confirmation"
        >
          <Declaration />
        </IdentitySection>
      </form>
    </FormContext>
  );
};

export default IdentityProfile;
