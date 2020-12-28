import React from 'react'
import { useAdminRouter } from 'app/pages/admin/router'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { privateClassNames } from 'helpers/classnames'

export const AdminRoot = () => {
  const { renderRoutes } = useAdminRouter()

  return (
    <RootContainer className={privateClassNames()}>
      <PageHeader label='Admin' />
      {renderRoutes()}
    </RootContainer>
  )
}
