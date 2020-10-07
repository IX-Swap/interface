import React from 'react'
import { useInvestRouter } from 'v2/app/pages/invest/router'
import { Container } from '@material-ui/core'

export const InvestRoot = () => {
  const { renderRoutes } = useInvestRouter()

  return <Container>{renderRoutes()}</Container>
}
