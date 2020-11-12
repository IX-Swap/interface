import React from 'react'
import { useSecurityRouter } from 'v2/app/pages/security/router'
import { Container } from '@material-ui/core'
import { PageHeader } from 'v2/app/components/PageHeader/PageHeader'
import { privateClassNames } from 'v2/helpers/classnames'

export const SecurityRoot: React.FC = () => {
  const { renderRoutes } = useSecurityRouter()

  return (
    <Container className={privateClassNames()}>
      <PageHeader alignment='flex-start' />
      {renderRoutes()}
    </Container>
  )
}
