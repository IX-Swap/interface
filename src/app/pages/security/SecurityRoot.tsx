import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { privateClassNames } from 'helpers/classnames'
import { useLocation } from 'react-router-dom'
import { SecurityRoute } from 'app/pages/security/router/config'
import { SecurityRouter } from 'app/pages/security/router/SecurityRouter'

export const SecurityRoot: React.FC = () => {
  const { pathname } = useLocation()
  const hideHeader =
    pathname === SecurityRoute.guide || pathname === SecurityRoute.setup2fa

  return (
    <RootContainer className={privateClassNames()}>
      {!hideHeader ? <PageHeader alignment='flex-start' /> : null}
      <SecurityRouter />
    </RootContainer>
  )
}
