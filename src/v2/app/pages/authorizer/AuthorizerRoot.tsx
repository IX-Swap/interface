import React from 'react'
import { useAuthorizerRouter } from 'v2/app/pages/authorizer/router'
import { Container } from '@material-ui/core'

export const AuthorizerRoot: React.FC = () => {
  const { renderRoutes } = useAuthorizerRouter()

  return <Container>{renderRoutes()}</Container>
}
