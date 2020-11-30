import React from 'react'
import { useSecurityRouter } from 'app/pages/security/router'
import { Container } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { privateClassNames } from 'helpers/classnames'

export const SecurityRoot: React.FC = () => {
  const { renderRoutes } = useSecurityRouter()

  return (
    <Container className={privateClassNames()}>
      <PageHeader alignment='flex-start' />
      {renderRoutes()}
    </Container>
  )
}
