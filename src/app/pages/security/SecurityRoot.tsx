import React from 'react'
import { useSecurityRouter } from 'app/pages/security/router'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { privateClassNames } from 'helpers/classnames'

export const SecurityRoot: React.FC = () => {
  const { renderRoutes } = useSecurityRouter()

  return (
    <RootContainer className={privateClassNames()}>
      <PageHeader alignment='flex-start' />
      {renderRoutes()}
    </RootContainer>
  )
}
