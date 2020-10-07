import React from 'react'
import { useIssuanceRouter } from 'v2/app/pages/issuance/router'
import { Container } from '@material-ui/core'

export const IssuanceRoot = () => {
  const { renderRoutes } = useIssuanceRouter()

  return <Container>{renderRoutes()}</Container>
}
