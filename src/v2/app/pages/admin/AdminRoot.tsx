import React from 'react'
import { useAdminRouter } from 'v2/app/pages/admin/router'
import { Container } from '@material-ui/core'
import { PageHeader } from 'v2/app/components/PageHeader/PageHeader'
import { privateClassNames } from 'v2/helpers/classnames'

export const AdminRoot = () => {
  const { renderRoutes } = useAdminRouter()

  return (
    <Container className={privateClassNames()}>
      <PageHeader label='Admin' />
      {renderRoutes()}
    </Container>
  )
}
