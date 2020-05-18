// @flow
import React from 'react';
import DepositList from './list';
import AuthorizerDepositsModule from './modules';

const { AuthorizerDepositListProvider } = AuthorizerDepositsModule;

export default function Banks() {
  return (
    <AuthorizerDepositListProvider>
      <DepositList />
    </AuthorizerDepositListProvider>
  );
}
