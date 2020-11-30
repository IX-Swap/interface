import React from 'react'
import { useAdminRouter } from 'app/pages/admin/router'
import { Container } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { privateClassNames } from 'helpers/classnames'

export const AdminRoot = () => {
  const { renderRoutes } = useAdminRouter()

  return (
    <Container className={privateClassNames()}>
      <PageHeader label='Admin' />
      {renderRoutes()}
    </Container>
  )
}
