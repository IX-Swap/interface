import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { privateClassNames } from 'helpers/classnames'
import { AdminRouter } from 'app/pages/admin/router/AdminRouter'

export const AdminRoot = () => {
  return (
    <RootContainer className={privateClassNames()}>
      <PageHeader title='Admin' alignment='flex-start' />
      <AdminRouter />
    </RootContainer>
  )
}
