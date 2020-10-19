import React from 'react'
import { useAccountsRouter } from 'v2/app/pages/accounts/router'
import { Container } from '@material-ui/core'
import { PageHeader } from 'v2/app/components/PageHeader/PageHeader'

export const AccountsRoot: React.FC = () => {
  const { renderRoutes } = useAccountsRouter()

  return (
    <Container>
      <PageHeader />
      {renderRoutes()}
    </Container>
  )
}
