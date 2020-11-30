import React from 'react'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { Container } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const IssuanceRoot = () => {
  const { renderRoutes } = useIssuanceRouter()

  return (
    <Container>
      <PageHeader />
      {renderRoutes()}
    </Container>
  )
}
