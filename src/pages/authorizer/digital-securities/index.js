// @flow
import React from 'react';
import WithdrawList from './list';
import AuthorizerDsoModule from './modules';

const { AuthorizerDsoListProvider } = AuthorizerDsoModule;

export default function DSWithdrawals() {
  return (
    <AuthorizerDsoListProvider>
      <WithdrawList />
    </AuthorizerDsoListProvider>
  );
}
