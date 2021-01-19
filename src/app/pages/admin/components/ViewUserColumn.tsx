import React from 'react'
import { IconButton } from '@material-ui/core'
import { Launch } from '@material-ui/icons'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { useAdminRouter } from 'app/pages/admin/router'

export interface ViewUserColumnProps {
  userId: string
}

export const ViewUserColumn = ({ userId }: ViewUserColumnProps) => {
  const { paths } = useAdminRouter()

  return (
    <IconButton
      component={AppRouterLinkComponent}
      size='small'
      to={paths.users} // TODO: replace when component is ready
    >
      <Launch color='disabled' />
    </IconButton>
  )
}
