// @flow
import React from 'react';
import WithdrawList from './list';
import AuthorizerWithdrawsModule from './modules';

const { AuthorizerWithdrawListProvider } = AuthorizerWithdrawsModule;

export default function Banks() {
  return (
    <AuthorizerWithdrawListProvider>
      <WithdrawList />
    </AuthorizerWithdrawListProvider>
  );
}
