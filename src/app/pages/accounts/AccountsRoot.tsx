import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { AccountsRouter } from 'app/pages/accounts/router/AccountsRouter'

export const AccountsRoot: React.FC = () => {
  return (
    <RootContainer>
      {/* <PageHeader /> */}
      <AccountsRouter />
    </RootContainer>
  )
}
