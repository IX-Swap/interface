import React from 'react'
import { Button } from '@material-ui/core'
import { AppRouterLink } from 'v2/components/AppRouterLink'

export interface ViewButtonProps {
  link: string
  params?: object
  replace?: boolean
}

export const ViewButton: React.FC<ViewButtonProps> = ({
  link,
  params = {},
  replace = false
}) => (
  <Button color='primary'>
    <AppRouterLink to={link} params={params} replace={replace}>
      View
    </AppRouterLink>
  </Button>
)
