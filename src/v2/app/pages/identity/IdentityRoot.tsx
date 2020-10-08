import React from 'react'
import { useIdentitiesRouter } from 'v2/app/pages/identity/router'
import { Container } from '@material-ui/core'
import { PageHeader } from 'v2/app/components/PageHeader/PageHeader'

export const IdentityRoot: React.FC = () => {
  const { renderRoutes } = useIdentitiesRouter()

  return (
    <Container>
      <PageHeader />
      {renderRoutes()}
    </Container>
  )
}
