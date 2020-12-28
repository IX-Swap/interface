import React from 'react'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const IssuanceRoot = () => {
  const { renderRoutes } = useIssuanceRouter()

  return (
    <RootContainer>
      <PageHeader />
      {renderRoutes()}
    </RootContainer>
  )
}
