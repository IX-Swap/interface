import React from 'react';
import BanksList from './list';
import AuthorizerBankModule from './modules';

const { AuthorizerBanksListProvider } = AuthorizerBankModule;

export default function Banks() {
  return (
    <AuthorizerBanksListProvider>
      <BanksList />
    </AuthorizerBanksListProvider>
  );
}
