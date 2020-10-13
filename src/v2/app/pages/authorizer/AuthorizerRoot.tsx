import React from 'react'
import { useAuthorizerRouter } from 'v2/app/pages/authorizer/router'
import { Container } from '@material-ui/core'
import { PageHeader } from '../../components/PageHeader/PageHeader'

export const AuthorizerRoot: React.FC = () => {
  const { renderRoutes } = useAuthorizerRouter()

  return (
    <Container>
      <PageHeader />
      {renderRoutes()}
    </Container>
  )
}
