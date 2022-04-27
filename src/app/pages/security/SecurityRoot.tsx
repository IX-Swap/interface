import React from 'react'
import { SecurityRouter } from 'app/pages/security/router/SecurityRouter'
import { AppContentWrapper } from 'ui/AppContentWrapper'

export const SecurityRoot: React.FC = () => {
  return (
    <AppContentWrapper container background='light'>
      <SecurityRouter />
    </AppContentWrapper>
  )
}
