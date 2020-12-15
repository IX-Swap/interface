import React from 'react'
import { Button } from '@material-ui/core'
import { AppRouterLinkComponent } from 'components/AppRouterLink'

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
  <Button
    component={AppRouterLinkComponent}
    color='primary'
    to={link}
    params={params}
    replace={replace}
  >
    View
  </Button>
)
