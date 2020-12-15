import React from 'react'
import { useIdentitiesRouter } from 'app/pages/identity/router'
import { Container } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const IdentityRoot: React.FC = () => {
  const { renderRoutes } = useIdentitiesRouter()

  return (
    <Container>
      <PageHeader alignment='flex-start' />
      {renderRoutes()}
    </Container>
  )
}
