import React from 'react'
import { useAccountsRouter } from 'v2/app/pages/accounts/router'
import { Container } from '@material-ui/core'
import { PageHeader } from '../../components/PageHeader/PageHeader'

export const AccountsRoot: React.FC = () => {
  const { renderRoutes, paths, current } = useAccountsRouter()
  const isLandingPage = current.path === paths.landing
  // debugger
  return (
    <Container>
      <PageHeader alignment={isLandingPage ? 'center' : 'flex-start'} />
      {renderRoutes()}
    </Container>
  )
}
