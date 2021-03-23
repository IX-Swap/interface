import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { privateClassNames } from 'helpers/classnames'
import { AdminRouter } from 'app/pages/admin/router/AdminRouter'

export const AdminRoot = () => {
  return (
    <RootContainer className={privateClassNames()}>
      <AdminRouter />
    </RootContainer>
  )
}
