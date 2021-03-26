import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { privateClassNames } from 'helpers/classnames'
import { useAdminRouter } from 'app/pages/admin/router'

export const AdminRoot = () => {
  const { renderRoutes } = useAdminRouter()

  return (
    <RootContainer className={privateClassNames()}>
      <PageHeader label='Admin' alignment='flex-start' />
      {renderRoutes()}
    </RootContainer>
  )
}
