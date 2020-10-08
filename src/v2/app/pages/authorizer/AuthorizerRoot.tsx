import React from 'react'
import { useAuthorizerRouter } from 'v2/app/pages/authorizer/router'
import { Container } from '@material-ui/core'
import { PageHeader } from '../../components/PageHeader/PageHeader'

export const AuthorizerRoot: React.FC = () => {
  const { renderRoutes, paths, current } = useAuthorizerRouter()
  const isLandingPage = current.path === paths.landing

  return (
    <Container>
      <PageHeader
        label={current.label}
        alignment={isLandingPage ? 'center' : 'flex-start'}
      />
      {renderRoutes()}
    </Container>
  )
}
