import React from 'react'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { Container } from '@material-ui/core'
import { PageHeader } from '../../components/PageHeader/PageHeader'
import { useBreadcrumbs } from '../../../hooks/useBreadcrumbs'

export const IdentityRoot: React.FC = () => {
  const { renderRoutes, paths } = useIdentitiesRouter()
  const breadcrumbs = useBreadcrumbs()
  const current = breadcrumbs[breadcrumbs.length - 1]
  const isLandingPage = current.path === paths.list

  return (
    <Container>
      <PageHeader
        label={current.label}
        breadcrumbs={isLandingPage ? undefined : breadcrumbs}
      />
      {renderRoutes()}
    </Container>
  )
}
