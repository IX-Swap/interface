import React from 'react'
import { SecurityRouter } from 'app/pages/security/router/SecurityRouter'
import { AppContentWrapper } from 'ui/AppContentWrapper'
import { RootContainer } from 'ui/RootContainer'

export const SecurityRoot: React.FC = () => {
  return (
    <AppContentWrapper container>
      <RootContainer>
        <SecurityRouter />
      </RootContainer>
    </AppContentWrapper>
  )
}
