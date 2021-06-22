import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { IssuanceRouter } from 'app/pages/issuance/router/IssuanceRouter'

export const IssuanceRoot = () => {
  return (
    <RootContainer>
      <IssuanceRouter />
    </RootContainer>
  )
}
