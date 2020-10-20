import React from 'react'
import { useAdminRouter } from 'v2/app/pages/admin/router'
import { Container } from '@material-ui/core'
import { PageHeader } from 'v2/app/components/PageHeader/PageHeader'

export const AdminRoot = () => {
  const { renderRoutes } = useAdminRouter()

  return (
    <Container>
      <PageHeader label='Admin' />
      {renderRoutes()}
    </Container>
  )
}
