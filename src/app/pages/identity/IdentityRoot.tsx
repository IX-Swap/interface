import { IdentityRouter } from 'app/pages/identity/router/IdentityRouter'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'

export const IdentityRoot = () => {
  return (
    <RootContainer>
      <IdentityRouter />
    </RootContainer>
  )
}
