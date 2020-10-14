import React from 'react'
import { useInvestRouter } from 'v2/app/pages/invest/routers/router'
import { Container } from '@material-ui/core'
import { PageHeader } from 'v2/app/components/PageHeader/PageHeader'

export const InvestRoot = () => {
  const { renderRoutes } = useInvestRouter()

  return (
    <Container>
      <PageHeader />
      {renderRoutes()}
    </Container>
  )
}
