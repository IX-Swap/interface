import React from 'react'
import { useSecurityRouter } from 'app/pages/security/router'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { privateClassNames } from 'helpers/classnames'
import { useLocation } from 'react-router-dom'

export const SecurityRoot: React.FC = () => {
  const { renderRoutes, paths } = useSecurityRouter()
  const { pathname } = useLocation()
  const hideHeader = pathname === paths.guide || pathname === paths.setup2fa

  return (
    <RootContainer className={privateClassNames()}>
      {!hideHeader ? <PageHeader alignment='flex-start' /> : null}
      {renderRoutes()}
    </RootContainer>
  )
}
