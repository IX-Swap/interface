import React from 'react'
import { useIssuanceRouter } from 'v2/app/pages/issuance/router'
import { Container } from '@material-ui/core'
import { PageHeader } from 'v2/app/components/PageHeader/PageHeader'

export const IssuanceRoot = () => {
  const { renderRoutes } = useIssuanceRouter()

  return (
    <Container>
      <PageHeader />
      {renderRoutes()}
    </Container>
  )
}
