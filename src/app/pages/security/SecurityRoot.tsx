import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { privateClassNames } from 'helpers/classnames'
import { SecurityRouter } from 'app/pages/security/router/SecurityRouter'

export const SecurityRoot: React.FC = () => {
  return (
    <RootContainer className={privateClassNames()}>
      <SecurityRouter />
    </RootContainer>
  )
}
