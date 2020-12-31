import React from 'react'
import { useAccountsRouter } from 'app/pages/accounts/router'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'

export const AccountsRoot: React.FC = () => {
  const { renderRoutes } = useAccountsRouter()

  return (
    <RootContainer>
      <PageHeader />
      {renderRoutes()}
    </RootContainer>
  )
}
