import React from 'react'
import { useInvestRouter } from 'app/pages/invest/routers/router'
import { Container } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const InvestRoot = () => {
  const { renderRoutes } = useInvestRouter()

  return (
    <Container>
      <PageHeader alignment='flex-start' />
      {renderRoutes()}
    </Container>
  )
}
