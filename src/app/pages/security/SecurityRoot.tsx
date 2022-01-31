import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { privateClassNames } from 'helpers/classnames'
import { SecurityRouter } from 'app/pages/security/router/SecurityRouter'
import { AppContentWrapper } from 'ui/AppContentWrapper'

export const SecurityRoot: React.FC = () => {
  return (
    <AppContentWrapper container background='light'>
      <RootContainer className={privateClassNames()}>
        <SecurityRouter />
      </RootContainer>
    </AppContentWrapper>
  )
}
