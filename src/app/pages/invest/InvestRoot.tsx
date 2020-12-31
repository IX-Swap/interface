import React from 'react'
import { useInvestRouter } from 'app/pages/invest/routers/router'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'

export const InvestRoot = () => {
  const { renderRoutes } = useInvestRouter()

  return (
    <RootContainer>
      <PageHeader alignment='flex-start' />
      {renderRoutes()}
    </RootContainer>
  )
}
