import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { OTCMarketRouter } from 'app/pages/exchange/router/OTCMarketRouter'

export const OTCMarketRoot = () => {
  return (
    <RootContainer>
      <OTCMarketRouter />
    </RootContainer>
  )
}
