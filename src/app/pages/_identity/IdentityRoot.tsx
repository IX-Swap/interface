import React from 'react'
import { useIdentitiesRouter } from 'app/pages/_identity/router'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const IdentityRoot = () => {
  const { renderRoutes } = useIdentitiesRouter()

  return (
    <RootContainer>
      <PageHeader alignment='flex-start' />
      {renderRoutes()}
    </RootContainer>
  )
}
