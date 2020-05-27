// @flow
import React from 'react';
import WithdrawList from './list';
import AuthorizerWithdrawsModule from './modules';

const { AuthorizerDSWithdrawListProvider } = AuthorizerWithdrawsModule;

export default function DSWithdrawals() {
  return (
    <AuthorizerDSWithdrawListProvider>
      <WithdrawList />
    </AuthorizerDSWithdrawListProvider>
  );
}
