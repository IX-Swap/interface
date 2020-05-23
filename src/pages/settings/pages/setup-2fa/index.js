import React from 'react';
import AuthenticatorStepper from './components/AuthenticatorStepper';
import { TwoFactorProvider } from './modules';

const GoogleAuthenticatorSetup = () => (
  <TwoFactorProvider>
    <AuthenticatorStepper />
  </TwoFactorProvider>
);

export default GoogleAuthenticatorSetup;
