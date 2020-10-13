import React from 'react'
import { useSecurityRouter } from 'v2/app/pages/security/router'
import { Container } from '@material-ui/core'
import { PageHeader } from 'v2/app/components/PageHeader/PageHeader'

export const SecurityRoot: React.FC = () => {
  const { renderRoutes } = useSecurityRouter()

  return (
    <Container>
      <PageHeader alignment='flex-start' />
      {renderRoutes()}
    </Container>
  )
}
