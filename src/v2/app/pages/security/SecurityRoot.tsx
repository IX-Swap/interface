import React from 'react'
import { useSecurityRouter } from 'v2/app/pages/security/router'
import { Container } from '@material-ui/core'

export const SecurityRoot: React.FC = () => {
  const { renderRoutes } = useSecurityRouter()

  return <Container>{renderRoutes()}</Container>
}
