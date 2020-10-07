import React from 'react'
import { useAccountsRouter } from 'v2/app/pages/accounts/router'
import { Container } from '@material-ui/core'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { useBreadcrumbs } from '../../../hooks/useBreadcrumbs'

export const AccountsRoot: React.FC = () => {
  const { renderRoutes, paths } = useAccountsRouter()
  const breadcrumbs = useBreadcrumbs()
  const current = breadcrumbs[breadcrumbs.length - 1]
  const isLandingPage = current.path === paths.landing

  return (
    <Container>
      <PageHeader
        label={current.label}
        breadcrumbs={isLandingPage ? undefined : breadcrumbs}
        alignment={isLandingPage ? 'center' : 'flex-start'}
      />
      {renderRoutes()}
    </Container>
  )
}
