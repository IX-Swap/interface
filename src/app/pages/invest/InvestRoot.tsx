import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { InvestRouter } from 'app/pages/invest/router/InvestRouter'

export const InvestRoot = () => {
  return (
    <RootContainer>
      <InvestRouter />
    </RootContainer>
  )
}
